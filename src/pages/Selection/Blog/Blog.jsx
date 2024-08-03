import React from "react";
import Pagination from "../../../components/Pagination/Pagination";
import useBlogSettings from "../../../helper/database/useBlogSettings";
import HandleBlog from "../../../utils/HandleBlog/HandleBlog";

const Blog = () => {
  const { blogData, blogload } = useBlogSettings();

  const data = blogData ? blogData : "";

  return (
    <div className="container mx-auto max-w-screen-md">
      <div className="flex flex-col gap-3 mt-10  mx-auto ">
        <div className="flex flex-col text-start   px-5">
          <div className="  border-b">
            <span className="text-3xl font-bold">Blog</span>
            <p className="text-sm italic">
              Make my day by telling me a story about yourself.
            </p>
          </div>
        </div>
        <div className="px-5  ">
          <HandleBlog blogdata={data} />
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default Blog;
