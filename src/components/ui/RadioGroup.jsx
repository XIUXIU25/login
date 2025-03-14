import React from "react";

function RadioGroup({ options, selectedValue, onChange }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="donationType"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="form-radio text-blue-600"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
