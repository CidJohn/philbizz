import React from "react";
import Listedcard from "../../../../components/Listedcard/Listedcard";

function BusinessList({listItems}) {
    
  return (
    <div className="flex flex-col  ">
      {listItems.map((item, index) => (
        <div className="w-full" key={index}>
          <Listedcard
            section={item.title}
            listItems={item.list}
            listclass={"text-md"}
            listclasses={"hover:bg-slate-100  "}
          />
        </div>
      ))}
    </div>
  );
}

export default BusinessList;
