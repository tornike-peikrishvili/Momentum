'use client';

import { useState } from 'react';

export default function Filters() {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  return (
    <div className="flex space-x-4 pb-6">
      <div className="border-2 rounded-lg border-purple-500 flex space-x-8 px-2 ">
        {['დეპარტამენტი', 'პროგრესი', 'თარიღით დალაგება'].map(
          (filter, index) => (
            <select
              key={index}
              className={`px-4 py-2 outline-none ${
                activeFilter === index ? 'text-purple-500' : 'text-black'
              }`}
              onClick={() =>
                setActiveFilter((prev) => (prev === index ? null : index))
              }
              onBlur={() => setActiveFilter(null)}
            >
              <option>{filter}</option>
            </select>
          ),
        )}
      </div>
    </div>
  );
}
