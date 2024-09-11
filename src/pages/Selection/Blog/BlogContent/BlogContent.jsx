import React, { useEffect, useState } from "react";
import { useBlogContent } from "../../../../helper/database/useBlogSettings";
import ImageBinary from "../../../../components/Image/ImageBinary";
import Images from "../../../../components/Image/Images";
import { useLocation } from "react-router-dom";
import restAPI from "../../../../helper/database/restAPI";

const BlogContent = (props) => {
  const { state } = useLocation();
  const { title } = state || { title: null };
  const [getidblog, setIdBlog] = useState();
  const [blogImage, setBlogImage] = useState([]);
  const { blogdata } = props;
  const { content, contentload } = useBlogContent(getidblog);
  const imagelink = restAPI();

  useEffect(() => {
    const idblog = blogdata
      ? blogdata?.find((item) => item.title === title)?.title || ""
      : [];
    const imageblog = content.images ? content.images.map((item) => item) : [];
    setBlogImage(imageblog);
    setIdBlog(idblog);
  }, [blogdata, content]);
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className=" text-center">
        <div className="text-2xl">{content.title}</div>
        <p className="text-wrap">{content.description}</p>
      </div>
      <div className=" flex flex-col items-center p-5">
        <div className="max-w-screen-lg">
          <Images src={imagelink.image + content.image} />
        </div>
      </div>
      <div className="flex flex-col items-center p-5 ">
        <div className="mx-auto">
          {blogImage &&
            blogImage.map((item, index) => (
              <div key={index} className="flex items-center p-10">
                <figure className=" p-4 mx-auto ">
                  <Images
                    className="rounded-lg border-2"
                    src={imagelink.image + item.imageURL}
                    alt="Hair salon interior"
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {item.contentDESC}
                  </figcaption>
                </figure>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
