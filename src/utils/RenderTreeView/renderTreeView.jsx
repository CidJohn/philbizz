import React from "react";
import TreeView from "../../components/Treeviews/Treeview";

const RenderTreeView = ({ currentPath, data, handleItemClick }) => {
  if (!data) return;

  const filteredData = data.filter((node) => node.path === currentPath.path);

  return (
    <div className="sticky top-0">
      {filteredData.length === 0 ? (
        ""
      ) : (
        <TreeView
          treeViewContent={filteredData}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default RenderTreeView;
