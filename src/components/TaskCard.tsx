import Image from 'next/image';
import { FaRegCommentAlt } from 'react-icons/fa';
import ProfileImg from '../../sources/profile.jpg';

export type Task = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
  comments: number;
  borderColor?: string;
};

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div
      className={`bg-white rounded-lg p-4 border-2 ${task.borderColor} relative`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs font-bold px-2 py-1 rounded-md border border-gray-300 bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-500">{task.date}</span>
      </div>
      <h3 className="font-bold px-2 text-black text-lg">{task.title}</h3>
      <p className="text-sm px-2 text-gray-600">{task.description}</p>
      <div className="flex justify-between items-center mt-4">
        <Image
          src={ProfileImg}
          width={32}
          height={32}
          alt="Profile"
          className="rounded-full w-8 h-8 border object-cover"
        />
        <div className="flex items-center text-gray-500">
          <FaRegCommentAlt size={14} className="mr-1" />
          <span className="text-sm">{task.comments}</span>
        </div>
      </div>
    </div>
  );
}
