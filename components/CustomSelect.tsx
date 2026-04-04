'use client';

import { useState } from 'react';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function CustomSelect({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  options,
}: CustomSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused;

  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '6px',
        }}
      >
        {label}
        <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e.target.value);
        }}
        style={{
          width: '100%',
          fontSize: '13px',
          fontWeight: '400',
          color: value ? '#1F2937' : '#9CA3AF',
          border: isActive ? '1px solid #1DC9A0' : '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: isActive ? '0 0 0 2px rgba(29, 201, 160, 0.1)' : 'none',
          outline: 'none',
          background: '#FFFFFF',
          cursor: 'pointer',
          lineHeight: '1.4',
          appearance: 'none',
          transition: 'all 0.2s ease',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232C2C2E' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '32px',
        }}
      >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    </div>
  );
}
