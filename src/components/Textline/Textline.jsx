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
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        ></textarea>
      ) : (
        <input
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
