import React, { useRef, useState } from "react";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";
import Pagination from "../../components/Pagination/Pagination";
import Horizontal from "../../components/Horizontal/Horizontal";
import { useNavigate } from "react-router-dom";

const HandleCompanyCard = (props) => {
  const { category, sideBarColor, navigates } = props;
  const { path, pageName, sideBarColorChanger } = navigates;
  const navigate = useNavigate();
  const listPaginationRef = useRef(null);
  const cardPaginationRef = useRef(null);
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
    navigate(`/company-page/${title}`, { state: { title: title } });
  };

  const handleChangeListPage = (pageNumber) => {
    navigate(`${path}#list-pagination`, {
      state: {
        pageName: pageName,
        path: path,
        sideBarColorChanger: sideBarColorChanger,
      },
    });
    setListCurrentPage(pageNumber);
    if (listPaginationRef.current) {
      listPaginationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleCardCurrentPage = (pageNumber) => {
    navigate(`${path}#card-pagination`, {
      state: {
        pageName: pageName,
        path: path,
        sideBarColorChanger: sideBarColorChanger,
      },
    });
    setCardCurrentPage(pageNumber);
    if (cardPaginationRef.current) {
      cardPaginationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderCard = (item, index) => (
    <div className="" key={index}>
      <div className="flex flex-wrap">
        <Card
          src={item.image}
          desc={item.description}
          title={item.title}
          onLink={() => handleLink(item.title)}
          hidden={true}
          style={{
            width: "400px",
            backgroundSize: "cover",
          }}
          theme={sideBarColor.theme}
          btnColor={sideBarColor.bgColor}
          textColor={sideBarColor.textColor}
        />
      </div>
    </div>
  );

  const renderList = (item, index) => (
    <div className="" key={index}>
      <div className="flex w-full  justify-center items-center">
        <List
          image={item.image}
          title={item.title}
          onLink={() => handleLink(item.title)}
          desc={item.description}
          className={"hover:bg-slate-200 w-full"}
          imgstyle={{ width: "200px", height: "100px" }}
          colorText={sideBarColor.textColor}
          style={{ width: "72vw" }}
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
      <div className="gap-2">
        {data.map((item, index) => renderList(item, index))}
      </div>
    </div>
  );

  return (
    <div>
      {
        <>
          <div className="" id="card-pagination" ref={cardPaginationRef}>
            <div className="p-3 ">{renderCardData(cardCurrentData)}</div>
          </div>
          <div className="flex p-3 items-center justify-center" id="page">
            <div className="flex mt-5">
              <Pagination
                currentPage={cardCurrentPage}
                totalPages={cardTotalPages}
                onPageChange={handleCardCurrentPage}
                link="card-pagination"
              />
            </div>
          </div>
          <div className={listCurrentData.length === 0 ? "hidden" : "block"}>
            <Horizontal />
          </div>
          <div id="list-pagination" ref={listPaginationRef}>
            {renderListData(listCurrentData)}
          </div>
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
              onPageChange={handleChangeListPage}
              link="list-pagination"
            />
          </div>
        </>
      }
    </div>
  );
};

export default HandleCompanyCard;
