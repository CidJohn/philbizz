import React from "react";
import List from "../../../components/List/List";
import sampleItem from "../../../content/sampleItem";
import Button from "../../../components/Button/Button";
function Menus() {
  return (
    <div>
      <div className="flex flex-col p-5 ">
        <h1 className="text-2xl font-bold">Menus</h1>
        <div className="flex flex-wrap p-5 gap-4  justify-center">
          <div className="flex flex-col">
            {sampleItem.map((item, index) => (
              <div className="">
                <List
                  title={item.name}
                  className={
                    "p-2 w-96 border-dashed shadow-none hover:bg-slate-100"
                  }
                />
              </div>
            ))}
            <div className="flex p-2 justify-end ">
              <Button
                text={"Submit"}
                className={
                  "p-2 border rounded-lg hover:bg-blue-400 hover:text-white"
                }
              />
            </div>
          </div>
          <div className="flex border-2 w-96 h-80 border-dashed rounded-lg "></div>
        </div>
      </div>
    </div>
  );
}

export default Menus;
