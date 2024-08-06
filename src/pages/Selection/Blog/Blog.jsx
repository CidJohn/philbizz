import React, { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import useBlogSettings from "../../../helper/database/useBlogSettings";
import HandleBlog from "../../../utils/HandleBlog/HandleBlog";
import Button from "../../../components/Button/Button";
import Spinner from "../../../components/Spinner/Spinner";
import { useAuth } from "../../../helper/auth/useAuthContext";
import BlogPost from "./BlogPost/BlogPost";

const Blog = () => {
  const { blogData, blogload } = useBlogSettings();
  const { isAuthenticated, authload } = useAuth();
  const data = blogData ? blogData : "";
  const [isModalOpen, setModalOpen] = useState(false);

  if (blogload) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <div className="container mx-auto max-w-screen-md">
      <div className="flex flex-col gap-3 mt-10  mx-auto ">
        <div className="flex flex-col text-start   px-5">
          <div className="flex justify-between  border-b p-2">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">Blog</span>
              <p className="text-sm italic">
                Make my day by telling me a story about yourself.
              </p>
            </div>
            <div className="flex">
              {authload ? (
                <Spinner />
              ) : isAuthenticated ? (
                <div className=" flex items-center ">
                  <Button
                    type="button"
                    text={"POST"}
                    className={
                      " p-2 rounded border-gray-700 text-gray-200 font-bold bg-blue-700  transform transition-transform duration-500 hover:scale-105 "
                    }
                    onClick={handleModalOpen}
                  />
                </div>
              ) : ( 
                <p className="text-red-700 italic text-sm  flex items-center">
                  "Please login!"
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="px-5  ">
          <HandleBlog blogdata={data} />
        </div>
        <Pagination />
      </div>
      {isModalOpen && <BlogPost handleOpen={handleModalOpen} />}
    </div>
  );
};

export default Blog;
