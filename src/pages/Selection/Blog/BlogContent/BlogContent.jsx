import React, { useEffect, useState } from "react";
import { useBlogContent } from "../../../../helper/database/useBlogSettings";
import ImageBinary from "../../../../components/Image/ImageBinary";
import Images from "../../../../components/Image/Images";
import { useLocation } from "react-router-dom";
import restAPI from "../../../../helper/database/restAPI";
import Spinner from "../../../../components/Spinner/Spinner";

const BlogContent = (props) => {
  const { blogdata } = props;
  const { state } = useLocation();
  const { title, user } = state || { title: null, user: null };
  const [getidblog, setIdBlog] = useState({
    title: title,
    user: user,
  });
  const [blogImage, setBlogImage] = useState([]);
  const { content, contentload } = useBlogContent(getidblog);
  const imagelink = restAPI();

  useEffect(() => {
    const idblog = blogdata
      ? blogdata?.find((item) => item.title === title)?.title || ""
      : [];
    const userblog = blogdata
      ? blogdata?.find((item) => item.title === title)?.username || ""
      : [];
    const imageblog = content.images ? content.images.map((item) => item) : [];

    setBlogImage(imageblog);
    //setIdBlog({ title: idblog, user: userblog });
  }, [blogdata, content, title]);

  if (contentload) {
    return (
      <div className="flex items-center justify-center h-[70vh] ">
        <Spinner />
      </div>
    );
  }
  console.log(content);
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className=" text-center">
        <div className="text-2xl">{content.title}</div>
        <p className="text-wrap">{content.description}</p>
      </div>
      <div className=" flex flex-col items-center p-5">
        <div className="max-w-screen-lg">
          <Images
            src={
              content.image2 ? content.image2 : imagelink.image + content.image1
            }
          />
        </div>
      </div>
      <div className="flex flex-col items-center p-5 ">
        <div className="mx-auto">
          {blogImage &&
            blogImage.map((item, index) =>
              item.imageURL ? (
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
              ) : (
                ""
              )
            )}
          {blogImage &&
            blogImage.map((item) => (
              <>
                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  style={{
                    padding: "10px",
                    marginTop: "10px",
                  }}
                  className="min-w-full text-center"
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
