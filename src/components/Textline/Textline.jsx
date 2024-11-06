import React, { forwardRef } from "react";

const Textline = forwardRef(
  (
    {
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
      checked,
    },
    ref
  ) => {
    return (
      <div className="">
        <label htmlFor={name} className={labelclass}>
          {label}
        </label>
        {textarea ? (
          <textarea
            ref={ref}
            disabled={disabled}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{
              ...style,
              "--placeholder-color": placeholderColor || "#999",
            }}
          ></textarea>
        ) : (
          <input
            checked={checked}
            ref={ref}
            disabled={disabled}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{
              ...style,
              "--placeholder-color": placeholderColor || "#999",
            }}
          />
        )}
        <style>
          {`
          input::placeholder,
          textarea::placeholder {
            color: var(--placeholder-color);
          }
        `}
        </style>
      </div>
    );
  }
);

export default Textline;
