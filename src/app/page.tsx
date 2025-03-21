import Filters from '../components/Filters';
import Header from '../components/Header';
import TaskBoardComponent from '../components/TaskBoard';

export default async function TaskBoard() {
  return (
    <div className="min-h-screen py-3 px-10 bg-white max-w-[1920px] mx-auto">
      <Header />
      <Filters />
      <TaskBoardComponent />
    </div>
  );
}
