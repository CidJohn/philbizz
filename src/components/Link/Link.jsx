import React from "react";

const Link = (props) => {
  const { to, className, style, children, target, disable } = props;
  return (
    <a href={to} className={className} style={style} target={target} disables={disable}>
      {children}
    </a>
  );
};

export default Link;
