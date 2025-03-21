import TaskCard, { Task } from './TaskCard';

export type Category = {
  id: number;
  title: string;
  color: string;
  borderColor: string;
};

export default function TaskColumn({
  category,
  tasks,
}: {
  category: Category;
  tasks: Task[];
}) {
  return (
    <div>
      <h2
        className={`text-white text-md text-center font-bold px-4 py-2 rounded-lg shadow-md ${category.color}`}
      >
        {category.title}
      </h2>
      <div className="space-y-4 mt-4">
        {tasks.map((task, idx) => (
          <TaskCard
            key={idx}
            task={{ ...task, borderColor: category.borderColor }}
          />
        ))}
      </div>
    </div>
  );
}
