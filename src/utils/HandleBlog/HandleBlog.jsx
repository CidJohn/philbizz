import React, { useEffect, useState } from "react";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";
import LikeButton from "../../components/Likebutton/Likebutton";
import Button from "../../components/Button/Button";
import BlogComment from "../../pages/Selection/Blog/BlogComment/BlogComment";
import { useBlogLiked } from "../../helper/database/useBlogSettings";

const HandleBlog = (props) => {
  const { blogdata, imagelink, handleCommentOpen, isCommentOpen, userdata } =
    props;
  const [getCommentID, setCommentID] = useState(null);

  const { fetchBlogLike, fetchInitialLikes, dataliked, setDataLiked } =
    useBlogLiked();

  useEffect(() => {
    fetchInitialLikes(blogdata, userdata.id);
  }, [blogdata, userdata.id]);

  const handleCommentClick = (commentID) => {
    setCommentID(commentID);
    handleCommentOpen();
  };

  const toggleLike = async (commentID) => {
    // Optimistically update UI before server response
    const currentLiked = dataliked[commentID];
    setDataLiked((prevLikes) => ({
      ...prevLikes,
      [commentID]: !currentLiked,
    }));

    const result = await fetchBlogLike({
      postid: commentID,
      userid: userdata.id,
    });

    if (result && !result.error) {
      setDataLiked((prevLikes) => ({
        ...prevLikes,
        [commentID]: result.liked,
      }));
    } else {
      // Revert the optimistic update if there was an error
      setDataLiked((prevLikes) => ({
        ...prevLikes,
        [commentID]: currentLiked,
      }));
    }
  };
  console.log(dataliked);
  const renderData = (items) => {
    return items.map((item, index) => {
      // Calculate the displayed like count based on whether the post is liked or unliked
      const isLiked = dataliked[item.commentID] || false;
      const displayedLikeCount = isLiked
        ? item.like_counter + 1
        : item.like_counter;

      return (
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
          <div className="flex gap-5 items-center">
            <div className="text-xs text-gray-500">
              likes: {displayedLikeCount}
            </div>
            <div>
              <LikeButton
                liked={isLiked}
                toggleLike={() => toggleLike(item.commentID)}
              />
            </div>
            <div>
              <Button
                text={"comment"}
                className={"text-gray-500 hover:underline"}
                onClick={() => handleCommentClick(item.commentID)}
                disabled={!userdata}
              />
            </div>
          </div>

          <Horizontal />
        </div>
      );
    });
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
