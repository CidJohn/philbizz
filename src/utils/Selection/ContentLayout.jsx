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
  adName,
  totalPages,
  currentItems,
  sideAds,
  desc,
  handleLink,
}) => {
  return (
    <div className="container mx-auto flex  w-[75vw] gap-3 ">
      <div className=" mt-2">
       
        {renderTreeView()}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col ">
          <div className="max-w-[30vw]">
            <Description type={desc} pageName={adName} />
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
              <div className=" mt-3 grid grid-cols-3  gap-2 ">
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
      <div className="flex  hidden lg:block mt-2 ">
        <div className="sticky top-5">
          <div className="px-3">
          <h1 className="font-sans font-bold  text-center text-red-500 bg-red-100 border rounded-lg  border-red-300">
            {adName} Latest Ads
          </h1>
          </div>
          {sideAds.map((item, index) => (
            <div className="flex p-2" key={index}>
              <Card
                src={item.card_image}
                title={item.title}
                desc={item.description}
                style={{
                  width: "200px",
                  backgroundSize: "cover",
                  height: "350px",
                }}
                hidden={true}
                onLink={() => handleLink(item.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
