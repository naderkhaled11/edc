import { createClient } from '@libsql/client';
import type { Employee, Admin, InventoryItem, Transaction } from './types';
import { AUTH_STATES } from './constants';
import { read, utils } from 'xlsx';

const db = createClient({
  url: 'file:local.db',
});

// Initialize database tables
async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeId TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'employee',
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS excel_sheets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      data JSON NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemId TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      quantity INTEGER NOT NULL DEFAULT 0,
      location TEXT NOT NULL,
      category TEXT,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      itemId INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      employeeId INTEGER NOT NULL,
      location TEXT NOT NULL,
      notes TEXT,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (itemId) REFERENCES inventory(id),
      FOREIGN KEY (employeeId) REFERENCES employees(id)
    )
  `);

  // Create default admin if not exists
  const adminExists = await db.execute({
    sql: 'SELECT * FROM admins WHERE username = ?',
    args: ['admin1']
  });

  if (adminExists.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO admins (username, password) VALUES (?, ?)',
      args: ['admin1', 'admin1']
    });
  }
}

// Initialize database on module load
initDb().catch(console.error);

// Inventory Management Functions
export async function addInventoryItem(data: {
  itemId: string;
  name: string;
  description?: string;
  quantity: number;
  location: string;
  category?: string;
}): Promise<void> {
  await db.execute({
    sql: `INSERT INTO inventory (itemId, name, description, quantity, location, category)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [data.itemId, data.name, data.description || '', data.quantity, data.location, data.category || '']
  });
}

export async function getInventoryItems(location: string): Promise<InventoryItem[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM inventory WHERE location = ? ORDER BY name',
    args: [location]
  });

  return result.rows.map((row: any) => ({
    id: row.id,
    itemId: row.itemId,
    name: row.name,
    description: row.description,
    quantity: row.quantity,
    location: row.location,
    category: row.category,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  }));
}

export async function updateInventoryQuantity(id: number, quantity: number): Promise<void> {
  await db.execute({
    sql: 'UPDATE inventory SET quantity = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    args: [quantity, id]
  });
}

export async function recordTransaction(data: {
  type: 'add' | 'sell';
  itemId: number;
  quantity: number;
  employeeId: number;
  location: string;
  notes?: string;
}): Promise<void> {
  await db.execute({
    sql: `INSERT INTO transactions (type, itemId, quantity, employeeId, location, notes)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [data.type, data.itemId, data.quantity, data.employeeId, data.location, data.notes || '']
  });

  // Update inventory quantity
  const item = await db.execute({
    sql: 'SELECT quantity FROM inventory WHERE id = ?',
    args: [data.itemId]
  });

  if (item.rows.length === 0) throw new Error('Item not found');

  const currentQuantity = (item.rows[0] as any).quantity;
  const newQuantity = data.type === 'add' 
    ? currentQuantity + data.quantity 
    : currentQuantity - data.quantity;

  if (newQuantity < 0) throw new Error('Insufficient quantity');

  await updateInventoryQuantity(data.itemId, newQuantity);
}

// Existing functions...
export async function saveExcelData(file: ArrayBuffer, location: string): Promise<void> {
  const workbook = read(file);
  
  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(worksheet);
    
    await db.execute({
      sql: 'INSERT INTO excel_sheets (name, location, data) VALUES (?, ?, ?)',
      args: [sheetName, location, JSON.stringify(jsonData)]
    });
  }
}

export async function getSheetNames(location: string): Promise<string[]> {
  const result = await db.execute({
    sql: 'SELECT DISTINCT name FROM excel_sheets WHERE location = ? ORDER BY createdAt DESC',
    args: [location]
  });
  
  return result.rows.map((row: any) => row.name);
}

export async function getSheetData(sheetName: string, location: string): Promise<any[]> {
  const result = await db.execute({
    sql: 'SELECT data FROM excel_sheets WHERE name = ? AND location = ? ORDER BY createdAt DESC LIMIT 1',
    args: [sheetName, location]
  });
  
  if (result.rows.length === 0) return [];
  return JSON.parse((result.rows[0] as any).data);
}

export async function createEmployee(data: {
  employeeId: string;
  name: string;
  phone: string;
  password: string;
  role?: string;
}): Promise<void> {
  const existing = await db.execute({
    sql: 'SELECT * FROM employees WHERE employeeId = ?',
    args: [data.employeeId]
  });

  if (existing.rows.length > 0) {
    throw new Error('Employee ID already exists');
  }

  await db.execute({
    sql: `INSERT INTO employees (employeeId, name, phone, password, role, status)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [data.employeeId, data.name, data.phone, data.password, data.role || 'employee', 'pending']
  });
}

export async function verifyEmployee(employeeId: string, password: string): Promise<Employee | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM employees WHERE employeeId = ? AND password = ? AND status = ?',
    args: [employeeId, password, 'approved']
  });

  if (result.rows.length === 0) return null;

  const employee = result.rows[0] as any;
  return {
    id: employee.id,
    employeeId: employee.employeeId,
    name: employee.name,
    phone: employee.phone,
    password: employee.password,
    role: employee.role,
    status: employee.status,
    createdAt: employee.createdAt,
    updatedAt: employee.updatedAt
  };
}

export async function verifyAdmin(username: string, password: string): Promise<Admin | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM admins WHERE username = ? AND password = ?',
    args: [username, password]
  });

  if (result.rows.length === 0) return null;

  const admin = result.rows[0] as any;
  return {
    id: admin.id,
    username: admin.username,
    password: admin.password,
    createdAt: admin.createdAt
  };
}

export async function getEmployees(): Promise<Employee[]> {
  const result = await db.execute('SELECT * FROM employees ORDER BY createdAt DESC');
  
  return result.rows.map((row: any) => ({
    id: row.id,
    employeeId: row.employeeId,
    name: row.name,
    phone: row.phone,
    password: row.password,
    role: row.role,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  }));
}

export async function updateEmployeeStatus(id: number, status: keyof typeof AUTH_STATES): Promise<void> {
  await db.execute({
    sql: 'UPDATE employees SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    args: [status, id]
  });
}