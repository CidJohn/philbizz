import React from "react";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";

const handleCompanyCard = (props) => {
  const { getDataInfo, filterdata, category } = props;

  const dataToDisplay = getDataInfo || [];

  const renderCard = (item, index) => {
    return (
      <div
        className="flex items-center justify-center mx-auto"
        key={item.childID}
      >
        <div className="flex flex-wrap">
          <Card
            src={item.image}
            desc={item.description}
            title={item.title}
            link={item.title}
            hidden={true}
            style={{
              width: "300px",
              backgroundSize: "cover",
              height: "350px",
            }}
          />
        </div>
      </div>
    );
  };

  const renderList = (item) => {
    return (
      <div className="flex flex-col mx-auto" key={item.childID}>
        <div className="flex">
          <List
            image={item.image}
            title={item.title}
            desc={item.description}
            className={"hover:bg-slate-100 md:w-[1000px]"}
            imgstyle={{ width: "100px", height: "70px" }}
            style={{ height: "100px" }}
          />
        </div>
      </div>
    );
  };

  const renderFilterData = (data) => {
    return (
      <div className="data-section">
        <div className="flex flex-wrap gap-5">
          {data.map((item, index) =>
            index < 50 ? renderCard(item, index) : renderList(item)
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {category && category.length > 0
        ? renderFilterData(category)
        : !category && !filterdata && renderFilterData(dataToDisplay)}
    </div>
  );
};

export default handleCompanyCard;
