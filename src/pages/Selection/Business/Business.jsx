import React from "react";
import BusinessNavbar from "../../../components/BusinessNavbar/BusinessNavbar";
import businenssContent from "../../../content/businessNavbarContent.json";
import Company from "./Company/Company";
import Card from "../../../components/Card/Card";
import SearchBar from "../../../components/Searchbar/Searchbar";
import List from "../../../components/List/List";

const Business = () => {
  const navbar = businenssContent.nabvar;
  const sidebar = businenssContent.sidebar;
  return (
    <div className="">
      <div className="flex flex-wrap mx-auto ">
        <div className="flex flex-row mx-auto  ">
          <div className="flex flex-col ">
            <div className="flex mx-auto">
              <ul className="flex ">
                {navbar.map((item, index) => (
                  <li
                    className="hover:underline decoration-sky-500 underline-offset-8 decoration-4 hover:py-2  p-3"
                    key={index}
                  >
                    <a href={item.path} key={index} className="  text-center">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col container">
              <div className="flex flex-col mx-10 max-w-screen-md">
                <List
                  image={
                    "https://companieshouse.ph/company-report-img/m-m-multi-consultancy-central-inc.jpg"
                  }
                  title={"M&M MULTI CONSULTANCY CENTRAL INC."}
                  desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
`}
                  className={"hover:bg-slate-100"}
                  imgstyle={{ width: "100px", height: "70px" }}
                  style={{ height: "100px" }}
                />
                <List
                  image={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
                  }
                  title={"SFA SEMICON PHILIPPINES CORPORATION"}
                  desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris`}
                  className={"hover:bg-slate-100"}
                  imgstyle={{ width: "100px", height: "70px" }}
                  style={{ height: "100px" }}
                />
                <List
                  image={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
                  }
                  title={"SFA SEMICON PHILIPPINES CORPORATION"}
                  desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris`}
                  className={"hover:bg-slate-100"}
                  imgstyle={{ width: "100px", height: "70px" }}
                  style={{ height: "100px" }}
                />
                <List
                  image={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
                  }
                  title={"SFA SEMICON PHILIPPINES CORPORATION"}
                  desc={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris`}
                  className={"hover:bg-slate-100"}
                  imgstyle={{ width: "100px", height: "70px" }}
                  style={{ height: "100px" }}
                />
                {/* <Company /> */}
              </div>
              <div className="flex flex-wrap pt-10">
                {/* <ul className="flex flex-col">
                    {sidebar.map((item, index) => (
                      <li
                        className="hover:underline decoration-sky-500 underline-offset-8 decoration-4 hover:py-2  p-3"
                        key={index}
                      >
                        <a
                          href={item.path}
                          key={index}
                          className="  text-center"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul> */}
              </div>
              {/* <div className="flex flex-col p-2">
                  <Card
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
                    }
                    title={"Sample Title About"}
                    desc={`Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.`}
                    hidden={true}
                  />
                  <Card
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLMRNnKIYiMwMKPNW5eqdq2ludhE6F3xZ-iQ&s"
                    }
                    title={"Sample Title About"}
                    desc={`Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.`}
                    hidden={true}
                  />
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
