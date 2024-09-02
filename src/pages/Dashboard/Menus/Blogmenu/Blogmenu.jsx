import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import SearchBar from "../../../../components/Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button/Button";
import { useBlogContent } from "../../../../helper/database/useBlogSettings";
import { BlogView } from "../BlogView/BlogView";

const Blogmenu = (props) => {
  const { handleBack, pageName, blog } = props;
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const { content, contentload } = useBlogContent(blogTitle);

  useEffect(() => {
    const imageblog = content.images ? content.images.map((item) => item) : [];
    setBlogImage(imageblog);
  }, [content]);
  const handleBlogDelete = (data) => {
    console.log(data);
  };
  const handleBlogView = (data) => {
    setBlogTitle(data.title);
  };

  const handleSearch = async (e) => {
    console.log(e.title);
  };

  return (
    <>
      <div className="flex p-5 flex-col gap-3  ">
        <div className="flex justify-between ">
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
          <div className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-2 ">
            <h1 className="text-2xl font-bold p-2">{pageName} list</h1>
            {blog && (
              <div className="flex flex-col justify-center min-w-80 min-w-[70vh] max-h-[80vh] ">
                <Table
                  tblheader={["Name", "Title", "Date Time"]}
                  tbldata={blog}
                  tblrow={["username", "title", "created_at"]}
                  onView={handleBlogView}
                  onDelete={handleBlogDelete}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col  bg-gray-100 rounded-lg shadow-lg p-2 ">
            <div className="sticky top-0 bg-gray-100">
              <h1 className="text-2xl font-bold p-2 ">View Blog Content</h1>
            </div>
            <div className="flex bg-white min-w-[70vh] max-h-[80vh] overflow-y-scroll p-2 rounded-lg">
              {content && <BlogView content={content} blogImage={blogImage} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogmenu;
