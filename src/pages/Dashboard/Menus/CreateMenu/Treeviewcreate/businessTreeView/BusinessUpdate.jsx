import React, { useState } from "react";
import Textline from "../../../../../../components/Textline/Textline";
import Button from "../../../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function BusinessUpdate(props) {
  const { business } = props;
  const [addTextline, setTextLine] = useState({});
  const [headerCategory, setHeaderCategory] = useState(() =>
    business.reduce((acc, item) => {
      acc[item.title] = item.title;
      return acc;
    }, {})
  );
  const [childCategory, setChildCategory] = useState(() =>
    business.reduce((acc, item) => {
      item.links.forEach((link) => {
        acc[link.id] = { id: link.id, name: link.name };
      });
      return acc;
    }, {})
  );

  const handleTextlineChange = (key, newValue, isChild = false) => {
    if (isChild) {
      setChildCategory((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    } else {
      setHeaderCategory((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
  };

  const handleUpdateButton = () => {
    const initialData = {
      header: headerCategory,
      child: childCategory,
    };
    console.log(initialData);
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

  const handleDynamicTextlineChange = (header, id, newValue) => {
    setTextLine((prev) => ({
      ...prev,
      [header]: prev[header].map((item) =>
        item.id === id ? { ...item, value: newValue } : item
      ),
    }));
    setChildCategory((prev) => ({
      ...prev,
      [header]: { parent: header, name: newValue },
    }));
  };

  return (
    <>
      {business.map((item, index) => (
        <div key={index}>
          <Textline
            value={headerCategory[item.title]}
            onChange={(e) => handleTextlineChange(item.title, e.target.value)}
            className={"p-2 border rounded-lg"}
          />
          <div className="flex flex-wrap gap-2 px-5">
            {item.links.map((link) => (
              <div key={link.id} className="flex flex-wrap">
                <Textline
                  value={childCategory[link.id].name || ""}
                  onChange={(e) =>
                    handleTextlineChange(link.id, e.target.value, true)
                  }
                  className={"p-2 border rounded-lg"}
                />
              </div>
            ))}
            {addTextline[item.title]?.map((textline) => (
              <div key={textline.id} className="flex flex-wrap">
                <Textline
                  placeholder={"Enter New Child Name"}
                  value={textline.value}
                  onChange={(e) =>
                    handleDynamicTextlineChange(
                      item.title,
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
                  className="border p-3 mt-2 rounded-lg hover:bg-blue-500 hover:text-white"
                />
              }
              onClick={() => handleAdd(item.title)}
              className={"px-1"}
            />
          </div>
        </div>
      ))}
      <div className="p-2">
        <Button
          text={"Update"}
          className={
            "border text-sm p-2 hover:bg-blue-700 hover:text-white rounded-lg w-full"
          }
          onClick={handleUpdateButton}
        />
      </div>
    </>
  );
}

export default BusinessUpdate;