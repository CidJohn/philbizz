import React from "react";
import Table from "../../../../components/Table/Table";
import SearchBar from "../../../../components/Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button/Button";
import sampleItem from "../../../../content/sampleItem";

const Blogmenu = (props) => {
  const { handleBack, pageName } = props;
  const handleBlogDelete = (data) => {
    console.log(data);
  };
  const handleBlogView = (data) => {
    console.log(data);
  };

  const handleSearch = async (e) => {
    console.log(e.title);
  };
  return (
    <>
      <div className="flex p-5 flex-col gap-3 border ">
        <div className="flex justify-between border">
          <div className="flex items-center">
            <Button
              onClick={handleBack}
              icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
              className={
                "px-2 text-lg text-gray-800 transform  transition-transform duration-500 hover:translate-x-3"
              }
            />
            <h1 className="text-2xl font-bold">Menu - {pageName} Page </h1>
          </div>
          <div className="flex ">
            <SearchBar hidden={true} onSearch={handleSearch} />
          </div>
        </div>
        <div className="flex border-2 min-w-full">
          <div className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-2 min-w-[70vh] max-h-[80vh] overflow-y-scroll">
            <h1 className="text-2xl font-bold p-2">{pageName} list</h1>
            <div className="flex flex-col justify-center min-w-80 ">
              <Table
                tblheader={["Name", "Email"]}
                tbldata={sampleItem}
                tblrow={["name", "email"]}
                onDelete={handleBlogView}
                onView={handleBlogDelete}
              />
            </div>
          </div>
          <div className="flex flex-col min-w-[70vh] max-h-[90vh] bg-gray-100 rounded-lg shadow-lg p-2 overflow-y-scroll">
            <h1 className="text-2xl font-bold p-2">View Profile</h1>
            {/* Content for View Profile */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogmenu;
