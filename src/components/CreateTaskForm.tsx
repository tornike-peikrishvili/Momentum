'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { createTask } from '../app/actions/api/tasks/tasks';
import FormField from './FormField';
import SelectField from './SelectField';

interface FormData {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number | '' | null;
  priority_id: number;
}

interface StatusOption {
  id: number;
  name: string;
}

interface PriorityOption {
  id: number;
  name: string;
}

interface EmployeeOption {
  id: number;
  name: string;
}

interface CreateTaskFormProps {
  statuses: StatusOption[];
  priorities: PriorityOption[];
  employees: EmployeeOption[];
  defaultValues: {
    status_id: number;
    priority_id: number;
    employee_id: number;
  };
}

export default function CreateTaskForm({
  statuses,
  priorities,
  employees,
  defaultValues,
}: CreateTaskFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    due_date: '',
    status_id: defaultValues.status_id || 0,
    employee_id: '', // Force empty string as default
    priority_id: defaultValues.priority_id || 0,
  });

  console.log('Employees:', employees);
  console.log('Default employee_id:', defaultValues.employee_id);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (['status_id', 'employee_id', 'priority_id'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : parseInt(value, 10), // Handle empty string
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (formData.employee_id == null) {
      setError('გთხოვთ აირჩიოთ თანამშრომელი');
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        employee_id:
          typeof formData.employee_id === 'string'
            ? parseInt(formData.employee_id)
            : formData.employee_id,
      };

      await createTask(submissionData);

      router.push('/tasks');
      router.refresh();
    } catch (err) {
      console.error('Error creating task:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          id="name"
          label="სათაური"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="ჩაწერეთ დავალების სათაური"
          minLength={3}
          maxLength={255}
          helpText={
            <>
              მინიმუმ 3 სიმბოლო
              <br />
              მაქსიმუმ 255 სიმბოლო
            </>
          }
        />

        <FormField
          id="description"
          label="აღწერა"
          as="textarea"
          value={formData.description}
          onChange={handleChange}
          placeholder="ჩაწერეთ რაში მდგომარეობს დავალება, საიდან და ფუნქციონალური თვისებები, რომლებიც უზრუნველყოფილი უნდა გახადოთ ან მსგავსი ინფორმაციისთვის."
          minLength={3}
          maxLength={255}
          rows={4}
          helpText={
            <>
              მინიმუმ 3 სიმბოლო
              <br />
              მაქსიმუმ 255 სიმბოლო
            </>
          }
        />

        <SelectField
          id="employee_id"
          label="პასუხისმგებელი თანამშრომელი"
          required
          value={formData.employee_id || ''} // Default to empty string
          onChange={handleChange}
          options={[
            { id: '', name: '-- აირჩიეთ თანამშრომელი --' }, // Empty option
            ...employees, // Add employees from the database
          ]}
        />
        <div className="grid grid-cols-2 gap-6">
          <SelectField
            id="priority_id"
            label="პრიორიტეტი"
            required
            value={formData.priority_id}
            onChange={handleChange}
            options={
              priorities.length > 0
                ? priorities
                : [
                    { id: 1, name: 'დაბალი' },
                    { id: 2, name: 'საშუალო' },
                    { id: 3, name: 'მაღალი' },
                  ]
            }
          />

          <SelectField
            id="status_id"
            label="სტატუსი"
            required
            value={formData.status_id}
            onChange={handleChange}
            options={
              statuses.length > 0
                ? statuses
                : [
                    { id: 1, name: 'დასაწყები' },
                    { id: 2, name: 'პროგრესში' },
                    { id: 3, name: 'მზად ტესტირებისთვის' },
                    { id: 4, name: 'დასრულებული' },
                  ]
            }
          />
        </div>

        <div>
          <label htmlFor="due_date" className="block text-sm mb-1">
            დედლაინი
          </label>
          <div className="relative">
            <input
              id="due_date"
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <CalendarIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'დამუშავება...' : 'დავალების შექმნა'}
          </button>
        </div>
      </form>
    </>
  );
}
