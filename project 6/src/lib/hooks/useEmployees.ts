import { useState, useEffect, useCallback } from 'react';
import { getEmployees, updateEmployeeStatus } from '../db';
import type { Employee } from '../types';
import { AUTH_STATES } from '../constants';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError('Failed to load employees');
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (id: number, status: typeof AUTH_STATES[keyof typeof AUTH_STATES]) => {
    try {
      await updateEmployeeStatus(id, status);
      await loadEmployees();
    } catch (err) {
      setError('Failed to update status');
      console.error('Failed to update status:', err);
    }
  }, [loadEmployees]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return {
    employees,
    loading,
    error,
    updateStatus,
    refresh: loadEmployees,
  };
}