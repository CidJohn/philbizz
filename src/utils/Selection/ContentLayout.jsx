import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import sampleItem from "../../content/sampleItem";
import SearchBar from "../../components/Searchbar/Searchbar";
import Description from "../../pages/Selection/Description/Description";
import List from "../../components/List/List";
import Horizontal from "../../components/Horizontal/Horizontal";
import Dropdown from "../../components/Dropdown/Dropdown";
import Images from "../../components/Image/Images";
import Card from "../../components/Card/Card";

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
  sideAds,
}) => {
  return (
    <div className="flex flex-col md:flex md:flex-wrap mx-auto container mt-5">
      <div className="flex flex-col md:flex-row ">
        <div className="hidden md:block ">{renderTreeView()}</div>
        <div className="flex flex-wrap justify-center items-center mx-auto ">
          <div>
            <div className="container flex flex-wrap max-w-screen-sm mx-auto">
              {!selectedItem?.id ? (
                <Description
                  type={business.businessPath}
                  path={business.name}
                />
              ) : (
                ""
              )}
            </div>
            <section
              id="card"
              className=" flex flex-wrap items-center mx-auto justify-center"
            >
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
                    width="300px"
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
              <div className=" mt-5 flex flex-wrap max-w-screen-md ">
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
        </div>
        <div className="flex max-w-screen-md hidden lg:block ">
          <div className="mt-5">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {business.name} Ads
            </h1>
            {sideAds.map((item, index) => (
              <div className="flex p-2" key={index}>
                <Card
                  src={item.card_image}
                  title={item.title}
                  desc={item.description}
                  style={{
                    width: "300px",
                    backgroundSize: "cover",
                    height: "350px",
                  }}
                  hidden={true}
                  link={item.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
