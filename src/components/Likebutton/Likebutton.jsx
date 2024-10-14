import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({liked, toggleLike}) => {
 

  return (
    <button
      className={`text-red-500 hover:text-red-600 focus:outline-none ${
        liked ? "text-red-600" : "text-gray-500"
      }`}
      onClick={toggleLike}
    >
      <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
      <span className="ml-2">{liked ? "Liked" : "Like"}</span>
    </button>
  );
};

export default LikeButton;
