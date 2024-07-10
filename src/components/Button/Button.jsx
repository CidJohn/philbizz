import React from "react";
import { useTranslation } from "react-i18next";

const Button = ({
  text,
  onClick,
  className,
  type = "button",
  disabled = false,
  icon,
}) => {
  const { t } = useTranslation();
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {t(text)}
    </button>
  );
};

export default Button;
