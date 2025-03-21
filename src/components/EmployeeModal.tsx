'use client';

import { useEffect, useState } from 'react';
import { getDepartments } from '../app/actions/api/departments/getDepartments';
import { createEmployee } from '../app/actions/api/createEmployee';
import Image from 'next/image';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeCreated: () => void;
}

export default function EmployeeModal({
  isOpen,
  onClose,
  onEmployeeCreated,
}: EmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    departmentId: '',
    avatar: null as File | null,
  });

  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Validation States
  const [nameValid, setNameValid] = useState({ min: false, max: false });
  const [surnameValid, setSurnameValid] = useState({ min: false, max: false });
  const [touched, setTouched] = useState({
    name: false,
    surname: false,
  });

  const validateName = (value: string) => {
    setNameValid({
      min: value.length >= 2,
      max: value.length <= 255,
    });
  };

  const validateSurname = (value: string) => {
    setSurnameValid({
      min: value.length >= 2,
      max: value.length <= 255,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name') validateName(value);
    if (name === 'surname') validateSurname(value);
  };

  const handleBlur = (field: 'name' | 'surname') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getValidationColor = (
    field: 'name' | 'surname',
    check: 'min' | 'max',
  ) => {
    const validState = field === 'name' ? nameValid : surnameValid;
    const isTouched = touched[field];

    if (!isTouched && formData[field] === '') {
      return 'text-gray-400';
    }

    if (validState[check] === null) {
      return 'text-gray-400';
    }

    return validState[check] ? 'text-green-600' : 'text-red-500';
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFormData((prev) => ({ ...prev, avatar: file }));

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchDepartments = async () => {
        try {
          const data = await getDepartments();
          setDepartments(data);
        } catch {
          setError('Error fetching departments');
        }
      };
      fetchDepartments();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateForm = () => {
    setError('');

    setTouched({
      name: true,
      surname: true,
    });

    const { name, surname, avatar, departmentId } = formData;

    if (!name || !surname || !avatar || !departmentId) {
      setError('All fields are required');
      return false;
    }

    if (name.length < 2) {
      setError('First name must be at least 2 characters');
      return false;
    }

    if (surname.length < 2) {
      setError('Last name must be at least 2 characters');
      return false;
    }

    if (!/^[a-zA-Zა-ჰ\s]+$/.test(name)) {
      setError(
        'First name must contain only letters (no numbers or special characters)',
      );
      return false;
    }

    if (!/^[a-zA-Zა-ჰ\s]+$/.test(surname)) {
      setError(
        'Last name must contain only letters (no numbers or special characters)',
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const { name, surname, avatar, departmentId } = formData;

    try {
      await createEmployee(name, surname, avatar!, departmentId);
      onEmployeeCreated();
      handleClose();
    } catch (err) {
      setError((err as Error).message);
      console.error('Error creating employee:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      surname: '',
      departmentId: '',
      avatar: null,
    });
    setPreviewUrl(null);
    setError('');
    setNameValid({ min: false, max: false });
    setSurnameValid({ min: false, max: false });
    setTouched({ name: false, surname: false });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-8 rounded-lg w-[600px] shadow-lg relative z-60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-xl font-bold text-center mb-6 text-black">
          თანამშრომლის დამატება
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">სახელი*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                className={`w-full border rounded-md p-2 outline-none ${
                  touched.name && !nameValid.min
                    ? 'border-red-500'
                    : touched.name && nameValid.min
                      ? 'border-green-500'
                      : 'border-gray-400'
                }`}
              />
              <div className="text-sm mt-1">
                <p
                  className={`${getValidationColor('name', 'min')} flex items-center`}
                >
                  ✔ მინიმუმ 2 სიმბოლო
                </p>
                <p
                  className={`${getValidationColor('name', 'max')} flex items-center`}
                >
                  ✔ მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">გვარი*</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={() => handleBlur('surname')}
                className={`w-full border rounded-md p-2 outline-none ${
                  touched.surname && !surnameValid.min
                    ? 'border-red-500'
                    : touched.surname && surnameValid.min
                      ? 'border-green-500'
                      : 'border-gray-400'
                }`}
              />
              <div className="text-sm mt-1">
                <p
                  className={`${getValidationColor('surname', 'min')} flex items-center`}
                >
                  ✔ მინიმუმ 2 სიმბოლო
                </p>
                <p
                  className={`${getValidationColor('surname', 'max')} flex items-center`}
                >
                  ✔ მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ფოტო*</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 relative">
              {previewUrl ? (
                <div className="flex justify-center">
                  <div className="relative">
                    <Image
                      src={previewUrl}
                      alt="Avatar preview"
                      className="h-20 w-20 rounded-full object-cover mx-auto"
                      width={80}
                      height={80}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, avatar: null }));
                        setPreviewUrl(null);
                      }}
                      className="absolute bottom-0 right-0 bg-white rounded-full shadow-md p-1 hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <span className="text-sm text-gray-500">
                    ჩააგდეთ ფაილი აქ ან აირჩიეთ
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              დეპარტამენტი*
            </label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="w-full border border-gray-400 outline-none rounded-md p-2 appearance-none"
            >
              <option value="">აირჩიეთ დეპარტამენტი</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {loading ? 'იტვირთება...' : 'თანამშრომლის დამატება'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
