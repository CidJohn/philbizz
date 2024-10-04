import React from "react";
import { useLocation } from "react-router-dom";

function Archived() {
  const { state } = useLocation();
  const { path, name } = state || { path: null, name: null };
  return (
    <>
    <div className="text-2xl font-sans font-bold">{name}</div>
    </>
  );
}

export default Archived;
