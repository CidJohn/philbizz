import React, { useEffect, useState } from "react";
import TreeView from "../../components/Treeviews/Treeview";

const RenderTreeView = (props) => {
  const { currentPath, data, handleItemClick, adName, sideBarColor } = props;
  if (!data) return;

  const filteredData = data.filter((node) => node.path === currentPath.path);

  return (
    <div
      className={` sticky top-5   mt-1 `}
      style={{ backgroundColor: sideBarColor ?  sideBarColor.bgColor : "#E639460D" }}
    >
      <h1
        className={`text-2xl font-bold  p-2 w-[15vw] border-b-4 border-gray-900 font-sans`}
        style={{
          color: sideBarColor? sideBarColor.textColor : "#E63946",
        }}
      >
        {adName}
      </h1>
      {filteredData.length === 0 ? (
        ""
      ) : (
        <div className=" px-2 mt-1">
          <TreeView
            treeViewContent={filteredData}
            onItemClick={handleItemClick}
            textColor={sideBarColor? sideBarColor.textColor : "#E63946"}
          />
        </div>
      )}
    </div>
  );
};

export default RenderTreeView;
