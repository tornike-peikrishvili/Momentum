'use server';

const API_URL = 'https://momentum.redberryinternship.ge/api/departments';

export async function getDepartments() {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch statuses');

    return await res.json();
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return [];
  }
}
