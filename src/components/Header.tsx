import Image from 'next/image';
import NavLogo from '../../sources/momentum-logo.png';
import CreateEmployeeBtn from './CreateEmployeeBtn';

export default async function Header() {
  return (
    <header className="flex justify-between items-center min-h-24">
      <Image src={NavLogo} alt="Momentum Logo" width={150} height={40} />
      <div className="space-x-2 flex">
        <CreateEmployeeBtn />
        <button className="px-5 py-1.5 bg-purple-500 text-base text-white rounded-lg">
          + შექმენი ახალი დავალება
        </button>
      </div>
    </header>
  );
}
