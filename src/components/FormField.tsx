interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  as?: 'input' | 'textarea';
  type?: string;
  rows?: number;
  helpText?: React.ReactNode;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  maxLength,
  as = 'input',
  type = 'text',
  rows = 3,
  helpText,
}: FormFieldProps) {
  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    placeholder,
    required,
    minLength,
    maxLength,
    className:
      'w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500',
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {helpText && <p className="text-xs text-green-600 mt-1">{helpText}</p>}
    </div>
  );
}
