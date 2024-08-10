import React, { useEffect, useState } from "react";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";
import LikeButton from "../../components/Likebutton/Likebutton";
import CommentSection from "../../components/Comment/Comment";

const HandleBlog = (props) => {
  const { blogdata, imagelink } = props;

  const renderData = (items) => {
    return items.map((item, index) => (
      <div className="p-2" key={index}>
        {console.log(imagelink.image + item.imageURL)}
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
        <div className="">
          <LikeButton />
          <CommentSection />
        </div>
        <Horizontal />
      </div>
    ));
  };
  return renderData(blogdata);
};

export default HandleBlog;
