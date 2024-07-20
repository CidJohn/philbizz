import React from "react";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";

const handleCompanyCard = (props) => {
  const { getDataInfo, filterdata, getLocation, getdropDown } = props;

  const Cardlist = (item, index) => {
    if (index < 50) {
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
    } else {
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
    }
  };

  return (
    <div className="flex flex-wrap gap-5">
      {getLocation === "" && getdropDown === "Select All"
        ? getDataInfo.map((item, index) => Cardlist(item, index))
        : filterdata.map((item, index) => Cardlist(item, index))}
    </div>
  );
};

export default handleCompanyCard;
