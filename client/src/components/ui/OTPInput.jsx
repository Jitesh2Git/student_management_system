import { useRef } from "react";
import { Input } from "./Input";

export const OTPInput = ({ value, onChange, length = 6, className = "" }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, inputValue) => {
    const newValue = value.split("");
    newValue[index] = inputValue;
    const updatedValue = newValue.join("");
    onChange(updatedValue);

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData);

    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={`flex gap-1 sm:gap-2 justify-center ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          required
          className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-center text-sm sm:text-lg font-medium 
          border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 
          focus:border-transparent transition-all duration-200 hover:border-gray-400 
          min-w-0 flex-shrink-0"
        />
      ))}
    </div>
  );
};
