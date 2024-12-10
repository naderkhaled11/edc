export interface Employee {
  id: number;
  employeeId: string;
  name: string;
  phone: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

export interface InventoryItem {
  id: number;
  itemId: string;
  name: string;
  description?: string;
  quantity: number;
  location: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  type: 'add' | 'sell';
  itemId: number;
  quantity: number;
  employeeId: number;
  location: string;
  notes?: string;
  createdAt: string;
}