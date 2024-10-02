import React, { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import useBlogSettings from "../../../helper/database/useBlogSettings";
import HandleBlog from "../../../utils/HandleBlog/HandleBlog";
import Button from "../../../components/Button/Button";
import Spinner from "../../../components/Spinner/Spinner";
import { useAuth } from "../../../helper/auth/useAuthContext";
import BlogPost from "./BlogPost/BlogPost";
import { useUserData } from "../../../helper/auth/useAuthentication";
import restAPI from "../../../helper/database/restAPI";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const { blogData, blogload } = useBlogSettings();
  const { isAuthenticated, authload } = useAuth();
  const datas = blogData ? blogData : "";
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const itemsPerPage = 5;
  const [cardCurrentPage, setCardCurrentPage] = useState(1);
  const { getData } = useUserData();
  const imagelink = restAPI();
  const userid = getData ? { id: getData.id, username: getData.username } : "";
  if (blogload) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  const cardTotalPages = Math.ceil(datas.length / itemsPerPage);

  const currentPost = datas
    ? datas.slice(
        (cardCurrentPage - 1) * itemsPerPage,
        cardCurrentPage * itemsPerPage
      )
    : [];

  const handleModalOpen = (item) => {
    //setModalOpen(!isModalOpen);
    navigate(`/blog/post/${item.id}`, { state: { id: item.id, username: item.username } });
  };
  const handleCommentOpen = () => {
    setCommentOpen(!isCommentOpen);
  };
  const handleLink = (item, user) => {
    navigate(`/${item}`, { state: { title: item, user: user } });
  };

  return (
    <React.Fragment>
      <div className="w-full h-full px-60 bg-[#390099]/5">
        <div className="flex items-center justify-between">
          <div className="mt-16">
            <h1 className="text-[#390099] font-bold fira-sans-bold text-4xl">
              Blog
            </h1>
            <p className="text-[#606060] fira-sans-condensed-regular">
              Make my day by telling me a story about yourself
            </p>
          </div>
          <div className="flex items-center justify-center mt-16">
            {authload ? (
              <Spinner />
            ) : isAuthenticated ? (
              <div className=" flex items-center ">
                <Button
                  type="button"
                  text={"POST"}
                  className={
                    " p-2 rounded border-gray-700 text-gray-200 font-bold bg-[#390099] px-12 py-3 transform transition-transform duration-500 hover:scale-105 "
                  }
                  onClick={() => handleModalOpen(userid)}
                />
              </div>
            ) : (
              <div className="flex items-center bg-transparent border px-8 py-3 border-red-400 rounded-full">
                <p className="text-red-700 italic text-sm  ">
                  "Required to login to post"
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex items-center justify-center w-full flex-col my-4 "
          id="card-pagination"
        >
          <HandleBlog
            blogdata={currentPost}
            imagelink={imagelink}
            handleCommentOpen={handleCommentOpen}
            isCommentOpen={isCommentOpen}
            userdata={userid}
            handleLink={handleLink}
          />
          <Pagination
            currentPage={cardCurrentPage}
            totalPages={cardTotalPages}
            onPageChange={setCardCurrentPage}
            link="card-pagination"
          />
        </div>

        {/* {isModalOpen && (
          <BlogPost handleOpen={handleModalOpen} userdata={userid} />
        )} */}
      </div>
    </React.Fragment>
  );
};

export default Blog;
