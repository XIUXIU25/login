// export function Input({ type = "text", value, onChange, placeholder = "", className = "" }) {
//     return (
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
//       />
//     );
//   }
  
  import { useState } from "react";

  export function Input({
    type = "text",
    value,
    onChange,
    placeholder = "",
    className = "",
    hasError = false,
    errorMessage = "",
  }) {
    const [isFocused, setIsFocused] = useState(false);
  
    return (
      <div className="w-full">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-2 border rounded-md transition-all focus:outline-none 
            ${hasError ? "border-red-500 focus:ring-red-400" 
              : isFocused ? "border-blue-500 focus:ring-blue-400" 
              : "border-gray-300 hover:border-gray-500"} 
            ${className}`}
        />
        {hasError && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
      </div>
    );
  }
  