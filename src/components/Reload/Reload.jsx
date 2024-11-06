import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

function Reload() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Reload;
