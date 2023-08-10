import React from "react";

const InputStatus = ({
  label,
  isRequire,
  options,
  name,
  selectedValue,
  handleChange,
}) => {
  return (
    <div className="flex flex-col">
      <label>
        {label}{" "}
        {isRequire ? <span className="text-red-500 align-middle">*</span> : ""}
      </label>
      <div className="join mt-1">
        {options.map((option) => (
          <input
            key={option.value}
            className="join-item btn"
            type="radio"
            name={name}
            aria-label={option.label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default InputStatus;
