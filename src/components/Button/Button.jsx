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
  title
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
    </button>
  );
};

export default Button;
