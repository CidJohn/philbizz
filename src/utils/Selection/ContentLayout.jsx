import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/Searchbar/Searchbar";
import Description from "../../pages/Selection/Description/Description";
import Dropdown from "../../components/Dropdown/Dropdown";
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
  adName,
  totalPages,
  currentItems,
  sideAds,
  desc,
  handleLink,
  sideBarColor,
  currentRef,
}) => {
  return (
    <div className=" mx-auto flex  w-[75vw] justify-center gap-3 ">
      <div className=" mt-2">{renderTreeView()}</div>
      <div className="flex flex-col">
        <div className="flex flex-col ">
          <div className="min-w-[45vw]">
            <Description
              content={desc}
              pageName={adName}
              txtHeaderColor={sideBarColor.textColor}
            />
          </div>
          <section id="cards" className="sticky top-5 " ref={currentRef}>
            <div
              className="flex flex-col  mt-5 p-2"
              style={{ backgroundColor: sideBarColor.bgColor }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-center  ">
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
                    adsBorder={sideBarColor.textColor}
                    textColor={sideBarColor.textColor}
                  />
                </div>
                <div className=" hidden lg:block text-sm py-5  h-[30px] border-gray-500 mx-3 ">
                  <div className="flex font-black text-sm text-gray-400 ">
                    or
                  </div>
                </div>
                <div className="flex flex-col mt-5 lg:mt-0">
                  <div className="text-md">Branch Name:</div>
                  <SearchBar
                    hidden={true}
                    onSearch={handleOnSearch}
                    adsBorder={sideBarColor.adsBorder}
                    textColor={sideBarColor.textColor}
                    placeholderColor={sideBarColor.placeholderColor}
                  />
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
            <h1
              className={`font-sans font-bold border text-center  rounded-lg p-1`}
              style={{
                color: sideBarColor.textColor,
                borderColor: sideBarColor.textColor,
              }}
            >
              {adName} Latest Ads
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-2">
            {sideAds.map((item, index) => (
              <div
                className="border-b-2 dashed py-3 border-dashed"
                style={{ borderColor: sideBarColor.textColor }}
              >
                <div className="bg-cover mx-auto " key={index}>
                  <Card
                    src={item.card_image}
                    title={item.title}
                    desc={item.description}
                    style={{
                      width: "230px",
                      backgroundSize: "cover",
                      border: "1px solid",
                      borderColor: sideBarColor.textColor,
                    }}
                    onLink={() => handleLink(item.title)}
                    btnColor={sideBarColor.bgColor}
                    textColor={sideBarColor.textColor}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
