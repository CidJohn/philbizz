import React, { useEffect, useState } from "react";
import { useBlogContent } from "../../../../helper/database/useBlogSettings";
import ImageBinary from "../../../../components/Image/ImageBinary";

const BlogContent = (props) => {
  const [getidblog, setIdBlog] = useState();
  const { blogdata } = props;
  const { content, contentload } = useBlogContent(getidblog);

  useEffect(() => {
    const idblog = blogdata ? blogdata.map((item) => item.username) : [];
    setIdBlog(idblog);
  }, [blogdata]);

  const titleContent = Array.isArray(content)
    ? content.slice(1).map((item) => item.title)
    : [];
  const descContent = Array.isArray(content)
    ? content.slice(1).map((item) => item.description)
    : [];

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className=" text-center">
        <div className="text-2xl">{titleContent}</div>
        <p className="text-wrap">{descContent}</p>
      </div>
      {content
        ? content.map((item, index) => (
            <div className=" flex flex-col items-center p-5">
              <div className="max-w-screen-lg">
                <ImageBinary binaryData={item.image.data} />
              </div>
              <div className="text-sm">"{item.contentDESC}"</div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default BlogContent;
