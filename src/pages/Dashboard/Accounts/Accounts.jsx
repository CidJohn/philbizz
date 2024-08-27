import React from "react";
import sampleItem from "../../../content/sampleItem";
import List from "../../../components/List/List";

function Accounts() {
  return (
    <div>
      <div className="flex flex-col p-5">
        <h1 className="text-2xl font-bold">User list</h1>
        <div className="flex flex-col justify-center min-w-80">
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
        </div>
      </div>
    </div>
  );
}

export default Accounts;
