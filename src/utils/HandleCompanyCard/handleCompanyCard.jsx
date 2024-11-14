import React, { useState } from "react";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";
import Pagination from "../../components/Pagination/Pagination";
import Horizontal from "../../components/Horizontal/Horizontal";
import { useNavigate } from "react-router-dom";

const HandleCompanyCard = (props) => {
  const { category } = props;
  const nav = useNavigate();
  const cardData = Array.isArray(category) ? category.slice(0, 115) : [];
  const listData = Array.isArray(category) ? category.slice(115) : [];

  const itemsPerPage = 10;
  const [cardCurrentPage, setCardCurrentPage] = useState(1);
  const [listCurrentPage, setListCurrentPage] = useState(1);

  const cardTotalPages = Math.ceil(cardData.length / itemsPerPage);
  const listTotalPages = Math.ceil(listData.length / itemsPerPage);

  const cardCurrentData = cardData.slice(
    (cardCurrentPage - 1) * itemsPerPage,
    cardCurrentPage * itemsPerPage
  );

  const listCurrentData = listData.slice(
    (listCurrentPage - 1) * itemsPerPage,
    listCurrentPage * itemsPerPage
  );
  const handleLink = (title) => {
    nav(`/${title}`, { state: { title: title } });
  };

  const renderCard = (item, index) => (
    <div
      className="flex items-center justify-center mx-auto"
      key={item.childID}
    >
      <div className="flex flex-wrap">
        <Card
          src={item.image}
          desc={item.description}
          title={item.title}
          onLink={() => handleLink(item.title)}
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

  const renderList = (item) => (
    <div className="flex flex-col mx-auto" key={item.childID}>
      <div className="flex">
        <List
          image={item.image}
          title={item.title}
          onLink={() => handleLink(item.title)}
          desc={item.description}
          className={"hover:bg-slate-100 md:w-[1000px]"}
          imgstyle={{ width: "100px", height: "70px" }}
          style={{ height: "100px" }}
        />
      </div>
    </div>
  );

  const renderCardData = (data) => (
    <div className="data-section">
      <div className="flex flex-wrap gap-5">
        {data.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  );

  const renderListData = (data) => (
    <div className="data-section">
      <div className="flex flex-col gap-5">
        {data.map((item) => renderList(item))}
      </div>
    </div>
  );

  return (
    <div>
      {
        <>
          <div className="" id="card-pagination">
            <div className="p-3">{renderCardData(cardCurrentData)}</div>
          </div>
          <div className="flex p-3 items-center justify-center" id="page">
            <div className="flex mt-5">
              <Pagination
                currentPage={cardCurrentPage}
                totalPages={cardTotalPages}
                onPageChange={setCardCurrentPage}
                link="card-pagination"
              />
            </div>
          </div>
          <div className={listCurrentData.length === 0 ? "hidden" : "block"}>
            <Horizontal />
          </div>
          <div id="list-pagination">{renderListData(listCurrentData)}</div>
          <div
            className={
              listCurrentData.length === 0
                ? "hidden"
                : "flex p-3 items-center justify-center"
            }
          >
            <Pagination
              currentPage={listCurrentPage}
              totalPages={listTotalPages}
              onPageChange={setListCurrentPage}
              link="list-pagination"
            />
          </div>
        </>
      }
    </div>
  );
};

export default HandleCompanyCard;
