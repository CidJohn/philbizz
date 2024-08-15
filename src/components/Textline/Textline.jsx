import React from "react";

const Textline = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  label,
  textarea,
  labelclass,
  disabled = false,
}) => {
  return (
    <div className="">
      <label
        htmlFor="email"
        className={`block mb-2 text-sm font-bold text-gray-900 dark:text-white ${labelclass}`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          disabled={disabled}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        ></textarea>
      ) : (
        <input
          disabled={disabled}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
};

export default Textline;
