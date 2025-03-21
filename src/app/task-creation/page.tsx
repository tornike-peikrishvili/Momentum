import CreateTaskForm from '../../components/CreateTaskForm';
import { getStatuses } from '../actions/api/statuses/statuses';
import { getPriorities, getEmployees } from '../actions/api/tasks/tasks';

export default async function CreateTaskPage() {
  const [statusesData, prioritiesData, employeesData] = await Promise.all([
    getStatuses(),
    getPriorities(),
    getEmployees(),
  ]);

  const statuses = statusesData?.data || [];
  const priorities = prioritiesData?.data || [];

  const employeesList = Array.isArray(employeesData)
    ? employeesData
    : employeesData?.data || [];

  const employees = employeesList.map((emp) => ({
    id: emp.id,
    name: `${emp.name} ${emp.surname}`,
  }));

  const defaultValues = {
    status_id: statuses[0]?.id || 1,
    priority_id: priorities[0]?.id || 1,
    employee_id: employees[0]?.id || 1,
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-8">შექმენი ახალი დავალება</h1>
      <CreateTaskForm
        statuses={statuses}
        priorities={priorities}
        employees={employees}
        defaultValues={defaultValues}
      />
    </div>
  );
}
