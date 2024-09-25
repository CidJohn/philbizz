import React from "react";
import TreeView from "../../components/Treeviews/Treeview";

const RenderTreeView = ({ currentPath, data, handleItemClick, adName }) => {
  if (!data) return;

  const filteredData = data.filter((node) => node.path === currentPath.path);

  return (
    <div className=" sticky top-5   mt-1 bg-red-100">
       <h1 className="text-2xl text-red-500 font-bold bg-red-100 p-2 w-[15vw] border-b-4 border-gray-900 font-sans">
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
