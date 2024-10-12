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
  title,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <button
      style={style}
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {icon}
      {t(text)}
      {spinner}
      {children}
    </button>
  );
};

export default Button;
