import React from 'react'

const Button = ({ text, onClick, className, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
