'use server';

export const createEmployee = async (
  name: string,
  surname: string,
  avatar: File,
  departmentId: string,
) => {
  const BEARER_TOKEN = '9e78e32d-406f-4fb3-a9ec-562678d8890e';
  const formData = new FormData();

  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('avatar', avatar);
  formData.append('department_id', departmentId);

  try {
    const response = await fetch(
      'https://momentum.redberryinternship.ge/api/employees',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      // Log more details about the error
      const errorText = await response.text();
      console.error('API response:', errorText);
      throw new Error(
        `Error ${response.status}: შეცდომა თანამშრომლის შექმნისას`,
      );
    }

    return await response.json();
  } catch (err) {
    console.error('API request failed:', err);
    throw new Error((err as Error).message);
  }
};
