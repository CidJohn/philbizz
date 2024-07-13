import React from "react";

const Link = (props) => {
  const { to, className, style, children } = props;
  return (
    <a href={to} className={className} style={style}>
      {children}
    </a>
  );
};

export default Link;
