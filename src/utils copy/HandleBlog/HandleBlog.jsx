import React, { useEffect, useState } from "react";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";
import LikeButton from "../../components/Likebutton/Likebutton";
import Button from "../../components/Button/Button";
import BlogComment from "../../pages/Selection/Blog/BlogComment/BlogComment";
import { useBlogLiked } from "../../helper/database/useBlogSettings";
import { FaRegComment } from "react-icons/fa";

const HandleBlog = (props) => {
  const {
    blogdata,
    imagelink,
    handleCommentOpen,
    isCommentOpen,
    userdata,
    handleLink,
    treeData,
  } = props;
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
      setDataLiked((prevLikes) => ({
        ...prevLikes,
        [commentID]: currentLiked,
      }));
    }
  };
  const renderData = (items) => {
    return items.map((item, index) => {
      const isLiked = dataliked[item.commentID] || false;
      const displayedLikeCount = isLiked
        ? item.like_counter + 1
        : item.like_counter;

      return (
        <div className='p-2' key={index}>
          <List
            title={item.title}
            desc={item.description}
            className={"border-none shadow-none"}
            user={item.username}
            onLink={() => handleLink(item.title, item.username)}
            binaryImage={
              !item.image ? imagelink.image + item.imageURL : item.image
            }
            classreverse={"flex-row-reverse"}
            imgstyle={{ width: "100%", height: "auto" }}
            datetime={item.created_at}
            classStyle={"text-2xl"}
          />
          <div className='flex gap-5 items-center '>
            <div>
              <LikeButton
                liked={isLiked}
                toggleLike={() => toggleLike(item.commentID)}
              />
            </div>
            <div
              className='flex items-center gap-2'
              onClick={() => handleCommentClick(item.commentID)}
            >
              <FaRegComment className='hover:underline cursor-pointer' />
              <Button
                text={"Comment"}
                className={"text-gray-500 hover:underline"}
              />
            </div>
          </div>
          {!isLiked && (
            <div className='text-xs text-gray-500 mt-2'>
              {displayedLikeCount >= 1 ? (
                <span className='text-[#606060] fira-sans-condensed-bold'>
                  {displayedLikeCount} likes this post
                </span>
              ) : (
                <span className='text-[#606060] fira-sans-condensed-bold'>
                  {displayedLikeCount} like this post
                </span>
              )}
            </div>
          )}
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
