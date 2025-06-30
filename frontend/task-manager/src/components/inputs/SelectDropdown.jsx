import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-black bg-white border border-slate-200 rounded px-3 py-2 flex items-center justify-between"
      >
        <span>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>
        <LuChevronDown
          className={`text-base transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded shadow">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;

