import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import Image from "../../components/Image/Image";
import sampleItem from "../../content/sampleItem";
import SearchBar from "../../components/Searchbar/Searchbar";
import Description from "../../pages/Selection/Description/Description";
import Categories from "../../components/Categories/Categories";

const ContentLayout = ({
  renderTreeView,
  handleCards,
  loading,
  data,
  currentPage,
  itemsPerPage,
  itemsMainPage,
  selectedItem,
  selectionContent,
  handlePageChange,
  handleOnSearch,
  businessType,
}) => {
  const business = businessType ? businessType : "";
  return (
    <div className="flex flex-wrap container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block">{renderTreeView()}</div>
        <div className="flex flex-wrap justify-center items-center mx-auto">
          <div className="">
            <div className="container flex flex-wrap">
              <Description type={business} />
            </div>
            <div className="flex items-center justify-center mt-5">
              <SearchBar hidden={true} onSearch={handleOnSearch} />
            </div>
            <div className="">{handleCards()}</div>

            <div className="mt-5 grid justify-items-end">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  selectedItem
                    ? selectionContent.length / itemsPerPage
                    : selectionContent.length / itemsMainPage
                )}
                onPageChange={handlePageChange}
              />
            </div>
            <hr className="border-t border-gray-300 my-5" />
          </div>
          <div className="flex flex-col mt-5">
            <h1 className="text-2xl font-bold mb-4">Item List 1</h1>
            <ul className="space-y-4">
              {sampleItem.map((item) => (
                <li
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-4 items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <figure className="max-w-md p-4">
              <Image
                className="rounded-lg"
                src={"ktv2.jpg"}
                alt="Hair salon interior"
              />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                Sample Header
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="flex-row">
          <div className="">
            <div className="mx-auto mt-5">
              <h1 className="text-2xl font-bold mb-4">Item List 2</h1>
              <ul className="space-y-4">
                {sampleItem.map((item) => (
                  <li
                    key={item.id}
                    className="bg-white shadow-md rounded-lg p-4 items-center"
                  >
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <figure className="max-w-md p-4">
                <Image
                  className="rounded-lg"
                  src={"ktv2.jpg"}
                  alt="Hair salon interior"
                />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  Sample Header
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto  items-center justify-center ">
        <Categories />
      </div>
    </div>
  );
};

export default ContentLayout;
