import React from "react";

const Textline = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  label,
}) => {
  return (
    <div className="">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default Textline;
