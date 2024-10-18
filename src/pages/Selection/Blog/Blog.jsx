import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import useBlogSettings from "../../../helper/database/useBlogSettings";
import HandleBlog from "../../../utils/HandleBlog/HandleBlog";
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
  const navigate = useNavigate();
  const { blogData, blogload } = useBlogSettings();
  const { getStorage } = useStorage();
  const { isAuthenticated, authload } = useAuth();
  const datas = blogData ? blogData : "";
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [filterPost, setFilterPost] = useState(false);

  const handleCheckboxChange = () => {
    setFilterPost((prevFilterPost) => !prevFilterPost);
  };

  const itemsPerPage = 5;
  const [cardCurrentPage, setCardCurrentPage] = useState(1);
  const { getData } = useUserData();
  const imagelink = restAPI();
  const userid = getData ? { id: getData.id, username: getData.username } : "";

  const [treeData, setTreeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    navigate(`/blog/post/${item}`, {
      state: { userIdentity: item },
    });
  };
  const userFilterPosts = isAuthenticated && filterPost;
  const userIdentification = getStorage("access_token");

  const handleCommentOpen = () => {
    setCommentOpen(!isCommentOpen);
  };

  const handleLink = (item, user) => {
    navigate(`/${item}`, { state: { title: item, user: user } });
  };

  const handleCategory = (id, path, name) => {
    console.log(`Category clicked: ${id}-${name}`);
    setSelectedCategory(name);
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
              <div className=" flex items-center flex-col ">
                <Button
                  type="button"
                  text={"POST"}
                  className={
                    " p-2 rounded border-gray-700 text-gray-200 font-bold bg-[#390099] px-12 py-3 transform transition-transform duration-500 hover:scale-105 "
                  }
                  onClick={() => handleModalOpen(userIdentification)}
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
        <div className="flex" id="card-pagination">
          <div className="sticky top-5  p-5">
            <TreeView
              treeViewContent={treeData}
              onItemClick={handleCategory}
              textColor="#333"
            />
          </div>

          <div className="flex flex-col items-center w-full shadow-lg my-4 p-2">
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
