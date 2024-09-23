import React from "react";
import TreeView from "../../components/Treeviews/Treeview";

const RenderTreeView = ({ currentPath, data, handleItemClick, adName }) => {
  if (!data) return;

  const filteredData = data.filter((node) => node.path === currentPath.path);

  return (
    <div className=" sticky top-5  p-2 mt-1 ">
       <h1 className="text-2xl font-bold bg-blue-300 px-2 w-[15vw]">
          {adName}
        </h1>
      {filteredData.length === 0 ? (
        ""
      ) : (
       <div className="border px-2 mt-1">
         <TreeView
          treeViewContent={filteredData}
          onItemClick={handleItemClick}
        />
       </div>
      )}
    </div>
  );
};

export default RenderTreeView;
