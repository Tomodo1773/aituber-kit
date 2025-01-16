import React from 'react'

interface TextInputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
