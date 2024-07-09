import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import Image from "../../components/Image/Image";
import sampleItem from "../../content/sampleItem";
import SearchBar from "../../components/Searchbar/Searchbar";
import Description from "../../pages/Selection/Description/Description";
import Categories from "../../components/Categories/Categories";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";

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
  const totalPages = Math.ceil(
    selectedItem?.id
      ? selectionContent.length / itemsPerPage
      : selectionContent.length / itemsMainPage
  );

  const currentItems = selectionContent.slice(
    (currentPage - 1) * (selectedItem?.id ? itemsPerPage : itemsMainPage),
    currentPage * (selectedItem?.id ? itemsPerPage : itemsMainPage)
  );

  return (
    <div className="flex flex-col md:flex md:flex-wrap mx-auto container ">
      <div className="flex flex-col md:flex-row ">
        <div className="hidden md:block ">{renderTreeView()}</div>
        <div className="flex flex-wrap justify-center items-center mx-auto">
          <div>
            <div className="container flex flex-wrap">
              {!selectedItem?.id ? <Description type={business.name} /> : ""}
            </div>
            <div className="flex items-center justify-center mt-5">
              <SearchBar hidden={true} onSearch={handleOnSearch} />
            </div>
            <div className=" mt-5 flex flex-wrap  ">
              {handleCards(currentItems)}
            </div>
            <div className="mt-5 grid justify-items-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            <Horizontal />
          </div>
          <div className="flex flex-wrap">
            <div className="mt-5">
              <h1 className="text-2xl font-bold mb-4">Item List 2</h1>
              {sampleItem.map((item) => (
                <List
                  key={item.id}
                  title={item.name}
                  desc={item.description}
                  id={item.id}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="mt-5">
            <h1 className="text-2xl font-bold mb-4">Sample Item list</h1>
            {sampleItem.map((item) => (
              <List
                key={item.id}
                title={item.name}
                desc={item.description}
                id={item.id}
              />
            ))}
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
      <div className="mx-auto items-center justify-center">
        <Categories />
      </div>
    </div>
  );
};

export default ContentLayout;
