import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'textarea';
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon: Icon,
  error,
  required,
  rows = 3,
  className = ''
}: InputProps) {
  const baseClasses = "w-full px-3 md:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm md:text-base";
  const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
  
  const inputElement = type === 'textarea' ? (
    <textarea
      className={`${baseClasses} ${errorClasses} ${className} resize-none`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      rows={rows}
    />
  ) : (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
      )}
      <input
        type={type}
        className={`${baseClasses} ${errorClasses} ${Icon ? 'pl-10 md:pl-12' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {inputElement}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}