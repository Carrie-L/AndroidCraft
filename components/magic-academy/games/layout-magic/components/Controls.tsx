import React from 'react';

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ControlGroupProps {
  title: string;
  options: Option[];
  value: string;
  onChange: (val: any) => void;
  colorTheme?: 'blue' | 'pink' | 'amber';
  disabled?: boolean;
}

export const ControlGroup: React.FC<ControlGroupProps> = ({ 
  title, 
  options, 
  value, 
  onChange, 
  colorTheme = 'blue',
  disabled = false
}) => {
  
  const themeClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-600',
    pink: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100 peer-checked:bg-pink-500 peer-checked:text-white peer-checked:border-pink-600',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 peer-checked:bg-amber-500 peer-checked:text-white peer-checked:border-amber-600',
  };

  return (
    <div className={`mb-6 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer relative">
            <input 
              type="radio" 
              name={title} 
              value={opt.value} 
              checked={value === opt.value} 
              onChange={(e) => onChange(e.target.value)}
              className="sr-only peer"
            />
            <div className={`
              px-4 py-2 rounded-xl border-2 transition-all duration-200 font-medium text-sm flex items-center gap-2 shadow-sm
              ${themeClasses[colorTheme]}
            `}>
              {opt.icon && <span>{opt.icon}</span>}
              {opt.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};