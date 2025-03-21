import { getStatuses } from '../app/actions/api/statuses/statuses';
import TaskColumn, { Category } from './TaskColumn';

type Task = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
  comments: number;
};

type Status = {
  id: number;
  name: string;
};

const statusColorsById: Record<number, { color: string; borderColor: string }> =
  {
    1: { color: 'bg-yellow-500', borderColor: 'border-yellow-500' }, // დასაწყები
    2: { color: 'bg-orange-500', borderColor: 'border-orange-500' }, // პროგრესში
    3: { color: 'bg-pink-500', borderColor: 'border-pink-500' }, // მზად ტესტირებისთვის
    4: { color: 'bg-blue-500', borderColor: 'border-blue-500' }, // დასრულებული
  };

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Fix Bug',
    description: 'Resolve the issue in UI',
    tags: ['ბექენდი', 'React'],
    date: '22 აგვ, 2022',
    comments: 8,
  },
  {
    id: 2,
    title: 'Deploy App',
    description: 'Push latest changes to production',
    tags: ['ფრონტენდი', 'UI'],
    date: '22 აგვ, 2022',
    comments: 4,
  },
];

export default async function TaskBoard() {
  const statuses: Status[] = await getStatuses();

  return (
    <div className="min-h-screen py-3 mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {statuses.length > 0 ? (
          statuses.map((status) => {
            const colorInfo = statusColorsById[status.id] ?? {
              color: 'bg-gray-400',
              borderColor: 'border-gray-400',
            };

            const category: Category = {
              id: status.id,
              title: status.name,
              color: colorInfo.color,
              borderColor: colorInfo.borderColor,
            };

            return (
              <TaskColumn
                key={status.id}
                category={category}
                tasks={mockTasks}
              />
            );
          })
        ) : (
          <p className="text-red-500">No statuses found</p>
        )}
      </div>
    </div>
  );
}
