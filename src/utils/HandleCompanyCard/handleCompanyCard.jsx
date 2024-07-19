import React from "react";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";

const handleCompanyCard = (props) => {
  const { getDataInfo, filterdata, getLocation, getListData } = props;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap">
        {getLocation === ""
          ? getDataInfo.map((item) => (
              <div className="flex felx-wrap" key={item.childID}>
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
            ))
          : filterdata.map((item) => (
              <div className="flex flex-wrap" key={item.childID}>
                <Card
                  src={item.image}
                  desc={item.description}
                  title={item.title}
                  hidden={true}
                  style={{
                    width: "300px",
                    backgroundSize: "cover",
                    height: "350px",
                  }}
                />
              </div>
            ))}
      </div>

      {getLocation === ""
        ? getListData
          ? getListData.map((item) => (
              <div className="flex flex-col mx-10 ">
                <List
                  image={item.image}
                  title={item.title}
                  desc={item.description}
                  className={"hover:bg-slate-100"}
                  imgstyle={{ width: "100px", height: "70px" }}
                  style={{ height: "100px" }}
                />
              </div>
            ))
          : filterdata.map((item) => (
              <div className="flex flex-wrap" key={item.childID}>
                <List
                  image={item.image}
                  title={item.title}
                  desc={item.description}
                  className={"hover:bg-slate-100"}
                  imgstyle={{ width: "100px", height: "70px" }}
                  style={{ height: "100px" }}
                />
              </div>
            ))
        : ""}
    </div>
  );
};

export default handleCompanyCard;
