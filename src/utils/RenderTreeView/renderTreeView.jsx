import React from "react";
import TreeView from "../../components/Treeviews/Treeview";
import Spinner from "../../components/Spinner/Spinner";

const RenderTreeView = ({ currentPath, data, handleItemClick }) => {
  if (!data) return;

  const filteredData = data.filter((node) => node.path === currentPath.path);

  return (
    <div>
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
