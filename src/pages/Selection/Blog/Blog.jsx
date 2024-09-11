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

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };
  const handleCommentOpen = () => {
    setCommentOpen(!isCommentOpen);
  };
  const handleLink = (item) => {
    navigate(`/${item}`, { state: { title: item } });
  }

  return (
    <div className="container mx-auto max-w-screen-md">
      <div className="flex flex-col gap-3 mt-10  mx-auto ">
        <div className="flex flex-col text-start   px-5">
          <div className="flex justify-between  border-b p-2">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">Blog</span>
              <p className="text-sm italic">
                Make my day by telling me a story about yourself.
              </p>
            </div>
            <div className="flex">
              {authload ? (
                <Spinner />
              ) : isAuthenticated ? (
                <div className=" flex items-center ">
                  <Button
                    type="button"
                    text={"POST"}
                    className={
                      " p-2 rounded border-gray-700 text-gray-200 font-bold bg-blue-700  transform transition-transform duration-500 hover:scale-105 "
                    }
                    onClick={handleModalOpen}
                  />
                </div>
              ) : (
                <p className="text-red-700 italic text-sm  flex items-center">
                  "Please login!"
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="px-5  " id="card-pagination">
          <HandleBlog
            blogdata={currentPost}
            imagelink={imagelink}
            handleCommentOpen={handleCommentOpen}
            isCommentOpen={isCommentOpen}
            userdata={userid}
            handleLink={handleLink}
          />
        </div>
        <Pagination
          currentPage={cardCurrentPage}
          totalPages={cardTotalPages}
          onPageChange={setCardCurrentPage}
          link="card-pagination"
        />
      </div>

      {isModalOpen && (
        <BlogPost handleOpen={handleModalOpen} userdata={userid} />
      )}
    </div>
  );
};

export default Blog;
