import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="mb-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mb-2">
            {comment}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
