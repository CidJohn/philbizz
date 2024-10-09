import React, { useEffect, useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import BusinessUpdate from "./businessTreeView/BusinessUpdate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import {
  useTreeChildUp,
  useTreevieUpdate,
  useTreeViewCreate,
} from "../../../../../helper/database/useCardSettings";

function Treeviewupdate(props) {
  const { treeview, name, path, business } = props;
  const [textLinesParent, setTextLinesParent] = useState({});
  const [textLinesChild, setTextLinesChild] = useState({});
  const [initialsData, setInitialsData] = useState(null);
  const [addTextline, setTextLine] = useState({});
  const { fetchTreeChildUp, resultChild } = useTreeChildUp();
  const { fetchTreeUpdate, resultUp } = useTreevieUpdate();
  const { fetchTreeCreate, resultNew } = useTreeViewCreate();

  useEffect(() => {
    const parentTextLines = {};
    const childTextLines = {};

    treeview.forEach((item) => {
      if (item.path === path) {
        parentTextLines[item.name] = item.name;
        if (item.children) {
          item.children.forEach((child) => {
            childTextLines[child.id] = { id: child.id, name: child.name };
          });
        }
      }
    });

    setTextLinesParent(parentTextLines);
    setTextLinesChild(childTextLines);
  }, [treeview, path, name]);

  const handleTextlineChange = (name, newValue, isChild = false) => {
    if (isChild) {
      setTextLinesChild((prev) => ({
        ...prev,
        [name]: { id: name, name: newValue },
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
      addNew: addTextline,
      path: path,
    };
      fetchTreeChildUp(data);
      fetchTreeCreate(data);
      fetchTreeUpdate(data);
  };

  const handleDynamicTextlineChange = (header, id, newValue) => {
    setTextLine((prev) => ({
      ...prev,
      [header]: prev[header].map((item) =>
        item.id === id ? { ...item, parent: header, value: newValue } : item
      ),
    }));
   
  };

  const handleAdd = (header) => {
    setTextLine((prev) => ({
      ...prev,
      [header]: [
        ...(prev[header] || []),
        { id: prev[header]?.length || 0, value: "" },
      ],
    }));
  };

  const renderTreeview = (data) => {
    return data
      .filter((item) => item.path === path)
      .map((item, index) => (
        <div className="flex flex-col border-4 p-2 rounded-lg" key={`${item.name}-${index}`}>
          <div className="flex flex-col gap-1">
            <div className="text-lg flex ">Parent Name:</div>
            <div className="flex mb-3 indent-8">
              <Textline
                value={textLinesParent[item.name] || ""}
                type={"text"}
                className={"border rounded-lg p-2"}
                onChange={(e) =>
                  handleTextlineChange(item.name, e.target.value)
                }
              />
            </div>
          </div>
          <div className="text-lg">Child Name:</div>
          {item.children && item.children.length > 0 && (
            <div className="flex flex-wrap indent-8  gap-3 ">
              {item.children.map((child, childIndex) => (
                <Textline
                  key={`${child.name}-${childIndex}`}
                  value={textLinesChild[child.id]?.name || ""}
                  type={"text"}
                  className={"border rounded-lg p-2"}
                  onChange={(e) =>
                    handleTextlineChange(child.id, e.target.value, true)
                  }
                />
              ))}
              {addTextline[item.name]?.map((textline) => (
                <div key={textline.id} className="flex flex-wrap ">
                  <Textline
                    placeholder={"Enter New Child Name"}
                    value={textline.value}
                    onChange={(e) =>
                      handleDynamicTextlineChange(
                        item.name,
                        textline.id,
                        e.target.value
                      )
                    }
                    className={"p-2 border rounded-lg"}
                  />
                </div>
              ))}
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faAdd}
                    className="border p-3 rounded-lg hover:bg-blue-500 hover:text-white"
                  />
                }
                onClick={() => handleAdd(item.name)}
                className={"px-1"}
              />
            </div>
          )}
        </div>
      ));
  };
  
  const renderBusinessUpdate = () => {
    return <BusinessUpdate business={business} path={path} />;
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
        <div className="bg-white flex flex-col p-2 min-w-80 border-2  rounded-lg  max-h-[60vh] overflow-hidden hover:overflow-y-scroll">
          <div className="text-2xl font-bold">View Form</div>
          {renderTreeData()}
        </div>
        <div className="bg-white flex flex-col p-2 gap-3 border-2 rounded-lg min-w-80 min-h-80  max-h-[60vh] overflow-hidden hover:overflow-y-scroll">
          <div className="text-2xl font-bold">Update Treeview Form</div>
          {name === "Business"
            ? renderBusinessUpdate()
            : renderTreeview(treeview)}
          {name === "Business" ? (
            ""
          ) : (
            <div className="p-2 flex justify-center w-full">
              <Button
                text={"Update"}
                className={
                  "border text-2xl py-3  hover:bg-blue-700 hover:text-white rounded-lg w-[10vw]"
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
