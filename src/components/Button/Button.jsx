import React from "react";
import { useTranslation } from "react-i18next";

const Button = ({
  text,
  onClick,
  className,
  type = "button",
  disabled = false,
  icon,
  spinner,
  style,
}) => {
  const { t } = useTranslation();
  return (
    <button
      style={style}
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {t(text)}
      {spinner}
    </button>
  );
};

export default Button;
