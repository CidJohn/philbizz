import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/Searchbar/Searchbar";
import Description from "../../pages/Selection/Description/Description";
import Horizontal from "../../components/Horizontal/Horizontal";
import Dropdown from "../../components/Dropdown/Dropdown";
import Card from "../../components/Card/Card";
import MaintenancePage from "../../components/Maintenance/Maintenance";

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
    <div className="container mx-auto flex ">
      <div className="mt-10">{renderTreeView()}</div>
      <div className="flex flex-col">
        <div className="flex flex-col min-w-80">
          <div className="">
            {!selectedItem?.id ? (
              <Description type={business.businessPath} path={business.name} />
            ) : (
              ""
            )}
          </div>
          <section id="cards" className="sticky top-5">
            <div className="flex flex-col">
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
              <div className=" mt-5 flex flex-wrap justify-center ">
                {handleCards(currentItems)}
              </div>
            </div>
          </section>
        </div>
        <div className="mt-5 grid justify-items-end">
          {!selectedItem?.id ? (
            filterData.length === 0 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                link={"cards"}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex max-w-screen-md hidden lg:block ">
        <div className="mt-5 sticky top-0">
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
  );
};

export default ContentLayout;
