import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";

const ViewAccount = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-2">
      <Button
        text={"Back"}
        className={"p-2 border rounded-full hover:bg-gray-300 hover:text-black"}
        onClick={handleBack}
      />
      <h1 className="text-2xl">HELLO world</h1>
    </div>
  );
};

export default ViewAccount;
