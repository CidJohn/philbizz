import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import Image from "../../components/Image/Image";
import sampleItem from "../../content/sampleItem";
import SearchBar from "../../components/Searchbar/Searchbar";
import Description from "../../pages/Selection/Description/Description";
import Categories from "../../components/Categories/Categories";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";
import Dropdown from "../../components/Dropdown/Dropdown";
import Images from "../../components/Image/Images";
import { footerContent } from "../../content/footerContent";

const ContentLayout = ({
  renderTreeView,
  handleCards,
  currentPage,
  selectedItem,
  handlePageChange,
  handleOnSearch,
  handleDropdownChange,
  dropdownOptions,
  dropdownValue,
  filterData,
  business,
  totalPages,
  currentItems,
}) => {
  return (
    <div className="flex flex-col md:flex md:flex-wrap mx-auto container ">
      <div className="flex flex-col md:flex-row ">
        <div className="hidden md:block ">{renderTreeView()}</div>
        <div className="flex flex-wrap justify-center items-center mx-auto">
          <div>
            <div className="container flex flex-wrap">
              {!selectedItem?.id ? (
                <Description
                  type={business.businessPath}
                  path={business.name}
                />
              ) : (
                ""
              )}
            </div>
            <section id="card">
              <Horizontal />
              <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
                <div className="flex flex-col max-w-80">
                  <div className="text-md">Address:</div>
                  <Dropdown
                    name="category"
                    value={dropdownValue}
                    onChange={handleDropdownChange}
                    options={dropdownOptions}
                    placeholder={"Select All"}
                    width="350px"
                    selectWidth="500px"
                  />
                </div>
                <div className=" hidden lg:block text-sm py-5  h-[30px] border-gray-500 mx-3 ">
                  <div className="flex font-black text-sm ">or</div>
                </div>
                <div className="flex flex-col mt-5 lg:mt-0">
                  <div className="text-md">Branch Name:</div>
                  <SearchBar hidden={true} onSearch={handleOnSearch} />
                </div>
              </div>
              <div className=" mt-5 grid grid-cols-2 lg:grid-cols-3 md:gap-20 lg:gap-0 ">
                {handleCards(currentItems)}
              </div>
            </section>
            <div className="mt-5 grid justify-items-end">
              {!selectedItem?.id ? (
                filterData.length === 0 ? (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    link={"card"}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="mt-5">
              <Horizontal />

              <h1 className="text-2xl font-bold mb-4">Item List 2</h1>
              {sampleItem.map((item) => (
                <List
                  key={item.id}
                  title={item.name}
                  desc={item.description}
                  id={item.id}
                  image={item.image}
                  style={{ height: "100px" }}
                  imgstyle={{ width: "100px", height: "70px" }}
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
              <Images
                className="rounded-lg"
                src={""}
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
  );
};

export default ContentLayout;
