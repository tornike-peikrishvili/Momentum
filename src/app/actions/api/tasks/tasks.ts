'use server';

// app/tasks/actions/api/tasks/tasks.ts
// Base API URL
const API_BASE_URL = 'https://momentum.redberryinternship.ge/api';
// Using the provided token
const AUTH_TOKEN = '9e78e32d-406f-4fb3-a9ec-562678d8890e';

interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

interface TaskForm {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
}

interface Priority {
  id: number;
  name: string;
}

/**
 * Fetch all tasks
 */
export async function getTasks(): Promise<ApiResponse<Task[]>> {
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
export async function createTask(
  formData: TaskForm,
): Promise<ApiResponse<Task>> {
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
export async function getTaskById(
  id: number,
): Promise<ApiResponse<Task> | null> {
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
export async function getPriorities(): Promise<ApiResponse<Priority[]>> {
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
    return { data: [] };
  }
}

/**
 * Get all employees
 */
export async function getEmployees(): Promise<ApiResponse<Employee[]>> {
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

    const data = await res.json();
    console.log('API Response for employees:', data);

    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return { data: [] };
  }
}
