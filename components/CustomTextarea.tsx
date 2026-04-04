'use client';

import { useState } from 'react';

interface CustomTextareaProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function CustomTextarea({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 2,
}: CustomTextareaProps) {
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
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e.target.value);
        }}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          fontSize: '13px',
          fontWeight: '400',
          color: '#1F2937',
          border: isActive ? '1px solid #1DC9A0' : '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '10px 12px',
          boxShadow: isActive ? '0 0 0 2px rgba(29, 201, 160, 0.1)' : 'none',
          outline: 'none',
          background: '#FFFFFF',
          transition: 'all 0.2s ease',
          resize: 'none',
          lineHeight: '1.4',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}
