import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import useBlogSettings from "../../../helper/database/useBlogSettings";
// import HandleBlog from "../../../utils/HandleBlog/HandleBlog";
import HandleBlog from "../../Selection_handler/HandleBlog/HandleBlog";
import Button from "../../../components/Button/Button";
import Spinner from "../../../components/Spinner/Spinner";
import { useAuth } from "../../../helper/auth/useAuthContext";
import { useUserData } from "../../../helper/auth/useAuthentication";
import restAPI from "../../../helper/database/restAPI";
import { useNavigate } from "react-router-dom";
import TreeView from "../../../components/Treeviews/Treeview";
import blogCategories from "../../../content/blog_categories.json";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import useStorage from "../../../helper/storage/Storage";

const Blog = () => {
  const { blogData, blogload } = useBlogSettings();
  const { getStorage } = useStorage();
  const { isAuthenticated, authload } = useAuth();
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [filterPost, setFilterPost] = useState(false);
  const [cardCurrentPage, setCardCurrentPage] = useState(1);
  // const { getData } = useUserData();
  const imagelink = restAPI();
  const [treeData, setTreeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const datas = blogData ? blogData : "";
  const itemsPerPage = 5;
  const userid = getStorage("account_id");

  const handleCheckboxChange = () => {
    setFilterPost((prevFilterPost) => !prevFilterPost);
  };

  useEffect(() => {
    setTreeData(blogCategories);
  }, [blogCategories]);

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
    navigate(`/blog/post`, {
      state: { userIdentity: item },
    });
  };
  const userFilterPosts = isAuthenticated && filterPost;

  const handleCommentOpen = () => {
    setCommentOpen(!isCommentOpen);
  };

  const handleLink = (item, user) => {
    navigate(`/blog-page/${item}`, { state: { title: item, user: user } });
  };

  const handleCategory = (id, path, name) => {
    console.log(`Category clicked: ${id}-${name}`);
    setSelectedCategory(name);
  };

  return (
    <React.Fragment>
      <div className="w-full h-full px-6 lg:px-60 bg-[#390099]/5">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full mt-16">
            <h1 className="text-[#390099] font-bold fira-sans-bold text-4xl">
              Blog
            </h1>
            <p className="text-[#606060] fira-sans-condensed-regular">
              Make my day by telling me a story about yourself
            </p>
          </div>
          <div className="w-full flex items-center justify-center mt-16">
            {authload ? (
              <Spinner />
            ) : isAuthenticated ? (
              <div className=" flex items-center flex-col ">
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
              <div className="w-full lg:w-60 flex items-center justify-center bg-transparent border px-8 py-3 border-red-400 rounded-full">
                <p className="text-red-700 italic text-sm text-center ">
                  "Required to login to post"
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row" id="card-pagination">
          <div className="block lg:sticky top-5  p-5">
            <TreeView
              treeViewContent={treeData}
              onItemClick={handleCategory}
              textColor="#333"
            />
          </div>

          <div className="flex flex-col items-center w-full shadow-lg my-4 px-6 lg:p-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-start gap-2">
                <label
                  htmlFor="AcceptConditions"
                  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
                >
                  <input
                    type="checkbox"
                    id="AcceptConditions"
                    className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                    checked={filterPost}
                    onChange={handleCheckboxChange}
                  />
                  <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
                    <AiFillCloseCircle data-unchecked-icon />
                    <AiFillCheckCircle className="hidden " data-checked-icon />
                  </span>
                </label>
                <span className="fira-sans-condensed-regular text-slate-700">
                  Show only my posts
                </span>
              </div>
            ) : null}
            {userFilterPosts ? (
              <span>User&apos;s Filtered Post only</span>
            ) : (
              <HandleBlog
                blogdata={currentPost}
                imagelink={imagelink}
                handleCommentOpen={handleCommentOpen}
                isCommentOpen={isCommentOpen}
                userdata={userid}
                handleLink={handleLink}
                treeData={treeData}
              />
            )}
            <hr className="my-4" />
            <Pagination
              currentPage={cardCurrentPage}
              totalPages={cardTotalPages}
              onPageChange={setCardCurrentPage}
              link="card-pagination"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blog;
