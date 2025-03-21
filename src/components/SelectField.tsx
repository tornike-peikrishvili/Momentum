interface Option {
  id: number | string; // Allow id to be a number or a string
  name: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: number | '';
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  includeEmptyOption?: boolean;
  emptyOptionLabel?: string;
}

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  includeEmptyOption = false,
  emptyOptionLabel = '-- აირჩიეთ --',
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value.toString()}
          onChange={onChange}
          className="w-full p-2 pr-8 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          required={required}
        >
          {includeEmptyOption && <option value="">{emptyOptionLabel}</option>}
          {options.map((option) => (
            <option key={option.id} value={option.id.toString()}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
