import React, { useRef, useState } from "react";
import Card from "../../../components/Card/Card";
import List from "../../../components/List/List";
import Pagination from "../../../components/Pagination/Pagination";
import Horizontal from "../../../components/Horizontal/Horizontal";
import { useNavigate } from "react-router-dom";

const HandleCompanyCard = (props) => {
  const { content, sideBarColor, navigates } = props;
  const { path, pageName, sideBarColorChanger } = navigates;
  const navigate = useNavigate();
  const listPaginationRef = useRef(null);
  const cardPaginationRef = useRef(null);
  const cardData = Array.isArray(content) ? content.slice(0, 115) : [];
  const listData = Array.isArray(content) ? content.slice(115) : [];

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
  const handleLink = (title, content) => {
    navigate(`/company-page/${title}`, {
      state: { title: title, content: content },
    });
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

  const renderCard = (item, index, content) => (
    <div className="" key={index}>
      {console.log(item)}
      <div className="p-2">
        <Card
          src={item.icon_image}
          desc={item.desc}
          title={item.name}
          onLink={() => handleLink(item.name, content)}
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

  const renderList = (item, index, content) => (
    <div className="" key={index}>
      <div className="flex w-full  ">
        <List
          image={item.image}
          title={item.name}
          onLink={() => handleLink(item.title, content)}
          desc={item.desc}
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
      <div className="flex flex-wrap justify-center  border-t py-5 w-full">
        {data.map((item, index) => item.card_info.map((items) => renderCard(items, index, item)) )}
      </div>
    </div>
  );

  const renderListData = (data, content) => (
    <div className="data-section">
      <div className="gap-2 w-full ">
        {data.map((item, index) => renderList(item, index, content))}
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
