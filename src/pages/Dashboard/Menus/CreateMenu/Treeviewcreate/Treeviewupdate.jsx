import React, { useEffect, useState } from "react";
import Textline from "../../../../../components/Textline/Textline";
import Button from "../../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useSideMenuUpdate } from "../../../../../helper/database/useTreeview";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../../../helper/alert/useAlert";
import { useToast } from "../../../../../components/Sonner/Sonner";

function Treeviewupdate(props) {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const toastify = useToast();
  const { name, path, viewMenus } = props;
  const [textLinesParent, setTextLinesParent] = useState({});
  const [textLinesChild, setTextLinesChild] = useState({});
  const [initialsData, setInitialsData] = useState(null);
  const [addTextline, setTextLine] = useState({});
  const { updateResult, updateLoading, putSideMenu } = useSideMenuUpdate();

  useEffect(() => {
    const parentTextLines = {};
    const childTextLines = {};
    viewMenus.forEach((item) => {
      if (item.path === path) {
        parentTextLines[item.name] = item.name;
        if (item.children) {
          item.children.forEach((child) => {
            childTextLines[child.id] = {
              id: child.id,
              name: child.name,
              parent: child.parent,
              path: child.path,
            };
          });
        }
      }
    });

    setTextLinesParent(parentTextLines);
    setTextLinesChild(childTextLines);
  }, [viewMenus, path, name]);

  const handleTextlineChange = (
    name,
    newValue,
    parentID,
    path,
    isChild = false
  ) => {
    if (isChild) {
      setTextLinesChild((prev) => ({
        ...prev,
        [name]: { id: name, name: newValue, parent: parentID, path: path },
      }));
    } else {
      setTextLinesParent((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleUpdateButton = () => {
    const parentItem = Object.keys(textLinesParent).map((parentName) => {
      const parent = viewMenus.find(
        (key) => key.name === parentName && key.path === path
      );
      return {
        id: parent ? parent.id : undefined,
        name: textLinesParent[parentName],
        path: path,
        parent: null,
        children: [
          ...Object.keys(textLinesChild)
            .filter((item) => {
              const child = textLinesChild[item];
              const isChildOfCurrentParent =
                child.parent === (parent ? parent.id : null);
              return isChildOfCurrentParent;
            })
            .map((childKey) => {
              const child = textLinesChild[childKey];
              return {
                id: child.id || undefined,
                name: child.name,
                path: path,
                parent: child.parent ? child.parent : null,
                children: [],
              };
            }),
          ...(addTextline[parentName]?.map((newChild) => ({
            name: newChild.value,
            path: path,
            parent: "",
            children: [],
          })) || []),
        ],
      };
    });
    const result = putSideMenu(parentItem);
    if (!result) {
      return toastify(`Something Went Wrong!`, "error");
    }
    return showAlert(
      "Successfull",
      "Side Menu Update Complete!",
      "success"
    ).then(() => {
      navigate(-1);
    });
  };

  const handleDynamicTextlineChange = (header, id, newValue, path) => {
    setTextLine((prev) => ({
      ...prev,
      [header]: prev[header].map((item) =>
        item.id === id ? { ...item, parent: header, value: newValue } : item
      ),
    }));
    setTextLinesChild((prev) => ({
      ...prev,
      [id]: {
        id: id,
        name: newValue,
        parent: header,
        path: path,
      },
    }));
  };

  const handleAdd = (header, parentID, path) => {
    setTextLine((prev) => ({
      ...prev,
      [header]: [
        ...(prev[header] || []),
        { id: prev[header]?.length || 0, value: "" },
      ],
    }));
  };

  const renderTreeview = (data) => {
    if (!data) return "";
    return data
      .filter((item) => item.path === path)
      .map((item, index) => (
        <div
          className="flex flex-col border-4 p-2 rounded-lg"
          key={`${item.name}-${index}`}
        >
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
                    handleTextlineChange(
                      child.id,
                      e.target.value,
                      child.parent,
                      child.path,
                      true
                    )
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
                        e.target.value,
                        path
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

  const renderTreeData = () => {
    // if (name === "Company") {
    //   return viewMenus
    //     .filter((item) => item.path === path)
    //     .map((item, index) => (
    //       <React.Fragment key={index}>
    //         <div className="text-lg font-bold p-2">{item.name}</div>
    //         {item.children.map((items, childINdex) => (
    //           <React.Fragment key={childINdex}>
    //             <div className="text-md pl-5 ">{items.name}</div>
    //           </React.Fragment>
    //         ))}
    //       </React.Fragment>
    //     ));
    // } else {
    return viewMenus.map(
      (item, index) =>
        item.path === path && (
          <React.Fragment key={index}>
            <div className="text-lg font-bold p-2">{item.name}</div>
            {item.children.map((items, childex) => (
              <React.Fragment key={childex}>
                <div className="text-md pl-5 ">{items.name}</div>
              </React.Fragment>
            ))}
          </React.Fragment>
        )
    );
    // }
  };

  return (
    <div className="p-5">
      <div className="flex gap-2">
        <div className="bg-white flex flex-col p-2 min-w-80 border-2  rounded-lg  max-h-[60vh] overflow-hidden hover:overflow-y-scroll">
          <div className="text-2xl font-bold">View Form</div>
          {renderTreeData()}
        </div>
        <div className="bg-white flex flex-col p-2 gap-3 border-2 rounded-lg min-w-80 min-h-80  max-h-[60vh] overflow-hidden hover:overflow-y-scroll">
          <div className="text-2xl font-bold">
            {name === "business"
              ? "Update Category Form"
              : "Update Treeview Form"}{" "}
          </div>
          {renderTreeview(viewMenus)}
          <div className="p-2 flex justify-center w-full">
            <Button
              text={"Update"}
              className={
                "border text-2xl py-3  hover:bg-blue-700 hover:text-white rounded-lg w-[10vw]"
              }
              onClick={handleUpdateButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treeviewupdate;
