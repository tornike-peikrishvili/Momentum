'use server';

// Base API URL
const API_BASE_URL = 'https://momentum.redberryinternship.ge/api';
// Using the provided token
const AUTH_TOKEN = '9e78e32d-406f-4fb3-a9ec-562678d8890e';

/**
 * Fetch all tasks
 */
export async function getTasks() {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch tasks');

    return await res.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return { data: [] };
  }
}

/**
 * Create a new task
 */
export async function createTask(formData: {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create task');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Fetch a single task by ID
 */
export async function getTaskById(id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Failed to fetch task with ID ${id}`);

    return await res.json();
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    return null;
  }
}

/**
 * Get all priority options
 */
export async function getPriorities() {
  try {
    const res = await fetch(`${API_BASE_URL}/priorities`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch priorities');

    return await res.json();
  } catch (error) {
    console.error('Error fetching priorities:', error);
    return [];
  }
}

/**
 * Get all employees
 */
export async function getEmployees() {
  try {
    const res = await fetch(`${API_BASE_URL}/employees`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch employees');

    return await res.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}
