import React from "react";
import restAPI from "../../../../helper/database/restAPI";
import Images from "../../../../components/Image/Images";

export const BlogView = (props) => {
  const { content, blogImage } = props;
  const imagelink = restAPI();

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
