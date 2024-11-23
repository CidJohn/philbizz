import React from "react";
import restAPI from "../../../../helper/database/restAPI";
import Images from "../../../../components/Image/Images";

export const BlogView = (props) => {
  const { content, blogImage } = props;
  const imagelink = restAPI();

  return (
    <div className="w-full mx-auto mt-5">
      <div className=" text-center">
        <div className="text-2xl">{content.title}</div>
        <p className="text-wrap">{content.description}</p>
      </div>
      <div className=" flex flex-col items-center p-5">
        <div className="max-w-screen-lg">
          {content ? (
            <>
              <Images src={content.imageUrl} />
            </>
          ) : (
            <div className="text-2xl font-bold flex items-center mx-auto">
              Please Select Place
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center p-5 ">
        <div className="mx-auto">
          <React.Fragment >
            <div
              dangerouslySetInnerHTML={{ __html: content.content }}
              style={{
                padding: "10px",
                marginTop: "10px",
              }}
              className="min-w-full text-center"
            />
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};
