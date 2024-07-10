import React from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { useCardPath } from "../../../helper/database/useCardPath";
import { useLocation } from "react-router-dom";

const Food = () => {
  const { cardpath, load } = useCardPath();
  const locationName = useLocation();

  const decodedPathname = decodeURIComponent(locationName.pathname);
  const path = cardpath
    ? cardpath.map((item) => `/${item.title}` === decodedPathname && item.title)
    : "";

  if (load) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="mx-auto flex flex-wrap items-center justify-center">
        <h1 className="text-2xl font-bold">"{path}"</h1>
        
      </div>
    </div>
  );
};

export default Food;
