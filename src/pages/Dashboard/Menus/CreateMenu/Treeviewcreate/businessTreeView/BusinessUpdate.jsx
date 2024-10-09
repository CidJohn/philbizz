import React, { useState } from "react";
import Textline from "../../../../../../components/Textline/Textline";
import Button from "../../../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import {
  useCategoryAddChild,
  useCategoryHeaderUp,
  useChildCategory,
} from "../../../../../../helper/database/useBusinessData";

function BusinessUpdate(props) {
  const { business, path } = props;
  const { fetchCategoryHeader, resultHeader, loadHeader } =
    useCategoryHeaderUp();
  const { fetchCateogryAddNewChild, addResult, loadNewAdd } =
    useCategoryAddChild();
  const { fetchChildCategory, resultChild, loaderChild } = useChildCategory();

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
        [key]: { id: key, name: newValue },
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
      addNew: addTextline,
      path: path,
    };
    fetchCategoryHeader(initialData);
    fetchCateogryAddNewChild(initialData);
    fetchChildCategory(initialData);
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
        item.id === id ? { ...item, header: header, value: newValue } : item
      ),
    }));
    
  };

  return (
    <>
      {business.map((item, index) => (
        <div key={index} className="border-4 p-2 rounded-lg  ">
          <h1 className="text-lg">Parent Name:</h1>
          <div className="indent-8">
            <Textline
              value={headerCategory[item.title]}
              onChange={(e) => handleTextlineChange(item.title, e.target.value)}
              className={"p-2 border rounded-lg"}
            />
          </div>

          <h1 className="text-lg">Children Name:</h1>
          <div className="flex flex-wrap gap-2 indent-8">
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
                  className="border p-3 rounded-lg hover:bg-blue-500 hover:text-white"
                />
              }
              onClick={() => handleAdd(item.title)}
              className={"px-1"}
            />
          </div>
        </div>
      ))}
      <div className="p-2 flex justify-center">
        <div className="flex w-[15vw]">
          <Button
            text={"Update"}
            className={
              "border text-2xl p-2 hover:bg-blue-700 hover:text-white rounded-lg w-full"
            }
            onClick={handleUpdateButton}
          />
        </div>
      </div>
    </>
  );
}

export default BusinessUpdate;
