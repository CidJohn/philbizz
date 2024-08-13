import React, { useEffect, useRef, useState } from "react";
import {
  useBlogCommentContent,
  useCommentPost,
} from "../../../../helper/database/useBlogSettings";
import Spinner from "../../../../components/Spinner/Spinner";
import Horizontal from "../../../../components/Horizontal/Horizontal";
import Button from "../../../../components/Button/Button";

const BlogComment = (props) => {
  const { handleCommentOpen, comment, userid } = props;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [firstID, setFirstID] = useState("");
  const [userID, setUserID] = useState("");
  const firstCommentRef = useRef(1); // Initialize with a non-comment value
  const { commentData, commentLoad } = useBlogCommentContent({
    id: firstID,
  });
  const initialData = {
    userid: userID,
    commentID: firstID,
    comment: newComment,
  };
  const { fetchCommentPost, result, postLoading } = useCommentPost();

  useEffect(() => {
    // Check if the firstCommentRef is still holding its initial value
    if (firstCommentRef.current === 1) {
      firstCommentRef.current = comment; // Store the first comment value
      setFirstID(comment);
      setUserID(userid);
    }
    const commentsData = commentData ? commentData.map((item) => item) : [];
    setComments(commentsData);
  }, [comment, commentData]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const res = await fetchCommentPost(initialData);
      if (res) {
        setComments([...comments, newComment]);
        setNewComment("");
        console.log(result);
      }
    }
  };
  if (commentLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="">
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md min-h-80   ">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comment
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCommentOpen}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 overflow-y-auto h-[400px]">
              <form className="space-y-4">
                <div className="p-4 md:p-5 flex flex-col ">
                  {comments ? (
                    comments.map((comment, index) => (
                      <div key={index}>
                        <div className="text-sm font-bold">
                          {comment.username}
                        </div>
                        <div className="flex text-xs  p-2 rounded ">
                          {comment.comment}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex  p-2 rounded mb-2">no posted!</div>
                  )}
                </div>
                <div className="flex p-5">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Write a comment..."
                  />
                  <Button
                    text={"Comment"}
                    onClick={handleAddComment}
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
