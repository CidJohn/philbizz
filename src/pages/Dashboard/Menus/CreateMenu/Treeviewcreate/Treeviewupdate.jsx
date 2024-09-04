import React, { useEffect, useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import BusinessUpdate from "./businessTreeView/BusinessUpdate";

function Treeviewupdate(props) {
  const { treeview, name, path, business } = props;

  // Manage the state of the text lines based on the path
  const [textLinesParent, setTextLinesParent] = useState({});
  const [textLinesChild, setTextLinesChild] = useState({});
  const [bussinessHeader, setHeader] = useState({});
  const [businessCategory, setCategory] = useState({});
  const [initialsData, setInitialsData] = useState(null);

  useEffect(() => {
    if (name === "Business") {
      const header = {};
      const category = {};

      business.map((item) => {
        header[item.title] = item.title;
        if (item.links) {
          item.links.map((child) => {
            category[child.id] = child.name;
          });
        }
      });
      setHeader(header);
      setCategory(category);
    } else {
      const parentTextLines = {};
      const childTextLines = {};

      treeview.forEach((item) => {
        if (item.path === path) {
          parentTextLines[item.name] = item.name;
          if (item.children) {
            item.children.forEach((child) => {
              childTextLines[child.id] = child.name;
            });
          }
        }
      });

      setTextLinesParent(parentTextLines);
      setTextLinesChild(childTextLines);
    }
  }, [treeview, path, name]);

  const handleTextlineChange = (name, newValue, isChild = false) => {
    if (isChild) {
      setTextLinesChild((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setTextLinesParent((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleUpdateButton = () => {
    const data = {
      parent: textLinesParent,
      child: textLinesChild,
    };
    console.log(data);
  };
  const handleViewButton = () => {
    console.log(initialsData);
  };

  const renderTreeview = (data) => {
    return data
      .filter((item) => item.path === path)
      .map((item, index) => (
        <div className="flex flex-col" key={`${item.name}-${index}`}>
          <div className="flex mb-3">
            <Textline
              label={"Parent Name:"}
              value={textLinesParent[item.name] || ""}
              type={"text"}
              className={"border rounded-lg p-2"}
              onChange={(e) => handleTextlineChange(item.name, e.target.value)}
            />
          </div>
          {item.children && item.children.length > 0 && (
            <div className="flex flex-col pl-5  gap-3">
              {item.children.map((child, childIndex) => (
                <Textline
                  label={"Child Name:"}
                  key={`${child.name}-${childIndex}`}
                  value={textLinesChild[child.id] || ""}
                  type={"text"}
                  className={"border rounded-lg p-2"}
                  onChange={(e) =>
                    handleTextlineChange(child.id, e.target.value, true)
                  }
                />
              ))}
            </div>
          )}
        </div>
      ));
  };
  const renderBusinessUpdate = () => {
    return <BusinessUpdate business={business} />;
  };

  const renderTreeData = () => {
    if (name === "Business") {
      return business.map((item) => (
        <>
          <div className="text-lg font-bold p-2">{item.title}</div>
          {item.links.map((items) => (
            <>
              <div className="text-md pl-5 ">{items.name}</div>
            </>
          ))}
        </>
      ));
    } else {
      return treeview.map(
        (item) =>
          item.path === path && (
            <>
              <div className="text-lg font-bold p-2">{item.name}</div>
              {item.children.map((items) => (
                <>
                  <div className="text-md pl-5 ">{items.name}</div>
                </>
              ))}
            </>
          )
      );
    }
  };

  return (
    <div className="p-5">
      <div className="flex gap-2">
        <div className="flex flex-col p-2 min-w-80 border-2  rounded-lg  max-h-[60vh] overflow-hidden hover:overflow-y-scroll">
          <div className="text-2xl font-bold">View Form</div>
          {renderTreeData()}
        </div>
        <div className="flex flex-col p-2 gap-3 border-2 rounded-lg min-w-80 min-h-80  max-h-[60vh] overflow-hidden hover:overflow-y-scroll">
          <div className="text-2xl font-bold">Update Form</div>
          {name === "Business"
            ? renderBusinessUpdate()
            : renderTreeview(treeview)}
          {name === "Business" ? (
            ""
          ) : (
            <div className="p-2">
              <Button
                text={"Update"}
                className={
                  "border text-sm p-2 hover:bg-blue-700 hover:text-white rounded-lg w-full"
                }
                onClick={handleUpdateButton}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Treeviewupdate;
