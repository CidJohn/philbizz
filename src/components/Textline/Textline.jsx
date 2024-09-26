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
  style,
  placeholderColor,
}) => {
  return (
    <div className="">
      <label htmlFor={name} className={labelclass}>
        {label}
      </label>
      {textarea ? (
        <textarea
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          style={{
            ...style,
            "--placeholder-color": placeholderColor || "#999", // Default placeholder color
          }}
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
          style={{
            ...style,
            "--placeholder-color": placeholderColor || "#999", // Default placeholder color
          }}
        />
      )}
      <style jsx>{`
        input::placeholder,
        textarea::placeholder {
          color: var(--placeholder-color);
        }
      `}</style>
    </div>
  );
};

export default Textline;
