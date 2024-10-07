import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import content from "../../../content/content.json";
import Table from "../../../components/Table/Table";

function Archived() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { path, name } = state || { path: null, name: null };
  const { archived } = content;
  const [onView, setOnView] = useState();

  const handleBack = () => {
    navigate(-1);
  };
  const handleOnView = (data) => {
    setOnView(data);
  };
  const handleOnDelete = (data) => {
    alert(`${data.item} deleted successfully!`);
  };
  const handleClose = () => {
    setOnView();
  };

  const renderTable = (data) => {
    return (
      <>
        <Table
          tblheader={["Title", "Address"]}
          tbldata={data}
          tblrow={["item", "desc"]}
          onDelete={handleOnDelete}
          onView={handleOnView}
        />
      </>
    );
  };

  const renderDisplay = (data) => {
    if (!data) return "";
    console.log(data);
    return (
      <>
        <div
          className={
            data ? "flex flex-col border p-10 w-[50vw] items-center" : "hidden"
          }
        >
          <div className="border w-full">
            <div className="flex justify-end p-3">
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faClose}
                    className="text-2xl border rounded-full text-gray-300 hover:border-gray-900 hover:text-gray-900 py-2 px-3"
                  />
                }
                className={""}
                onClick={() => handleClose()}
              />
            </div>
            <div className="flex flex-col items-center min-h-[70vh]">
              <h1 className="text-2xl">{data.item}</h1>

              <div className="flex">{data.desc}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="flex items-center">
          <Button
            onClick={handleBack}
            icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
            className={
              "px-2 text-lg text-gray-800 transform  transition-transform duration-500 hover:translate-x-3"
            }
          />
          <h1 className="text-2xl font-bold">Achived - {name} Page </h1>
        </div>
        <div className="w-full p-5">
          <div
            className={
              onView
                ? "flex  min-h-[80vh]"
                : " w-full  rounded-lg  min-h-[80vh]"
            }
          >
            {renderTable(archived)}
            {renderDisplay(onView)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Archived;
