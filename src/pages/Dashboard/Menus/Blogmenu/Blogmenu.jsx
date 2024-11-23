import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import SearchBar from "../../../../components/Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button/Button";
import {
  useBlogContent,
  useBlogViewList,
} from "../../../../helper/database/useBlogSettings";
import { BlogView } from "../BlogView/BlogView";
import { useNavigate } from "react-router-dom";

const Blogmenu = (props) => {
  const { handleBack, pageName, blog, path } = props;
  const navigate = useNavigate();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [dataBlog, setDataBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const { content, contentload } = useBlogContent(blogTitle);
  const { viewBlogs, fireBlogView } = useBlogViewList();

  useEffect(() => {
    setLoading(true);
    const loading = setTimeout(() => {
      setLoading(false);
      setDataBlog(viewBlogs);
    }, 500);
    return () => clearTimeout(loading);
  }, [content, viewBlogs]);
  const handleBlogDelete = (data) => {
    console.log(data);
  };
  const handleBlogView = (data) => {
    setBlogTitle(data);
  };

  const handleSearch = async (e) => {
    if (e.title === "") {
      setDataBlog([]);
    } else {
      const filterBlog = viewBlogs
        ? viewBlogs.filter((item) => item.title.toLowerCase().includes(e.title))
        : "";
      setDataBlog(filterBlog);
    }
  };
  const handleBlogUpdate = (item) => {
    navigate("/dashboard/Form/Create", {
      state: {
        name: pageName,
        path: path,
        title: item.title,
        user: item.username,
        blogTitle: { title: item.title, user: item.username },
      },
    });
  };

  const renderTable = (data) => {
    return (
      <>
        <div className="flex flex-col justify-center  max-h-[65vh]">
          <Table
            tblheader={["Title", "Date Time"]}
            tbldata={data}
            tblrow={["title", "created_at"]}
            onUpdate={handleBlogUpdate}
            onDelete={handleBlogDelete}
            onView={handleBlogView}
          />
        </div>
      </>
    );
  };

  const handleCreate = () => {
    navigate("/dashboard/Form/Create", {
      state: { name: pageName, path: path, title: blogTitle.title },
    });
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
        <div className="flex  min-w-full">
          <div className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-2 gap-2 min-w-[70vh] max-h-[80vh]">
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold p-2 ">{pageName} list</h1>
              {dataBlog.length > 0
                ? renderTable(dataBlog)
                : viewBlogs.length > 0
                ? renderTable(viewBlogs)
                : ""}
            </div>
            <div className="flex min-w-full justify-center">
              <Button
                text={"Create New Post"}
                className={"border p-2 hover:bg-blue-500 rounded-lg min-w-full"}
                onClick={handleCreate}
              />
            </div>
          </div>
          <div className="flex flex-col  bg-gray-100 rounded-lg shadow-lg p-2 ">
            <div className="sticky top-0 bg-gray-100">
              <h1 className="text-2xl font-bold p-2 ">View Blog Content</h1>
            </div>
            <div className="flex bg-white min-w-[70vh] max-h-[70vh] overflow-y-scroll p-2 rounded-lg">
              {content ? (
                <BlogView content={blogTitle} />
              ) : (
                <div className="text-2xl font-bold flex items-center mx-auto">
                  Please Select Place
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogmenu;
