import React, { useState } from "react";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";
import LikeButton from "../../components/Likebutton/Likebutton";
import Button from "../../components/Button/Button";
import BlogComment from "../../pages/Selection/Blog/BlogComment/BlogComment";

const HandleBlog = (props) => {
  const { blogdata, imagelink, handleCommentOpen, isCommentOpen, userdata } =
    props;
  const [getCommentID, setCommentID] = useState(null);

  // Function to handle comment button click
  const handleCommentClick = (commentID) => {
    setCommentID(commentID);
    handleCommentOpen(); // Open the comment section
  };

  const renderData = (items) => {
    return items.map((item, index) => (
      <div className="p-2" key={index}>
        <List
          title={item.title}
          desc={item.description}
          className={"border-none shadow-none"}
          user={item.username}
          link={item.title}
          binaryImage={imagelink.image + item.imageURL}
          classreverse={"flex-row-reverse"}
          imgstyle={{ width: "100px", height: "70px" }}
          datetime={item.created_at}
          classStyle={"text-2xl"}
        />
        <div className="flex gap-5">
          <div className="">
            <LikeButton />
          </div>
          <div className="">
            <Button
              text={"comment"}
              className={"text-gray-500 hover:underline"}
              onClick={() => handleCommentClick(item.commentID)}
              disabled={!userdata && true}
            />
          </div>
        </div>

        <Horizontal />
      </div>
    ));
  };

  return (
    <>
      {renderData(blogdata)}
      {isCommentOpen && (
        <BlogComment
          handleCommentOpen={handleCommentOpen}
          comment={getCommentID}
          userid={userdata}
        />
      )}
    </>
  );
};

export default HandleBlog;
