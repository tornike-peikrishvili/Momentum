'use client';

import { useState } from 'react';
import EmployeeModal from '../components/EmployeeModal';

export default function CreateEmployeeBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer px-5 py-1.5 border-2 border-purple-500 rounded-lg text-base text-black hover:text-white hover:bg-purple-500 hover:duration-150"
      >
        თანამშრომლის შექმნა
      </button>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployeeCreated={() => {
          alert('თანამშრომელი წარმატებით შეიქმნა!');
        }}
      />
    </div>
  );
}
