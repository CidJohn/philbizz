import React from "react";
import Card from "../../components/Card/Card";
import useCardSettings from "../../helper/database/useCardSettings";
import Spinner from "../../components/Spinner/Spinner";

const HandleCards = ({
  currentPath,
  selectedItem,
  currentItems,
  searchError,
  searchResult,
  handleLink,
  navbar,
  sideBarColor,
}) => {
  const { businessTypes, searchload } = useCardSettings(
    currentPath.businessPath
  );

  if (searchload) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  if (!currentItems && !businessTypes) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const renderCards = (items) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <div className="bg-cover mx-auto ">
          <Card
            src={item.card_image}
            title={item.title}
            desc={item.description}
            style={{
              width: "240px",
              backgroundSize: "cover",
            }}
            hidden={true}
            onLink={() => handleLink(item.title)}
            btnColor={sideBarColor.bgColor}
            textColor={sideBarColor.textColor}
          />
        </div>
      </React.Fragment>
    ));
  };

  const matchingNavItem = navbar.find((item) => item.name === currentPath.name);

  if (matchingNavItem) {
    if (searchError) {
      return <div className="error-message">{searchError}</div>;
    }

    if (!selectedItem?.id) {
      if (searchResult && searchResult.length > 0) {
        return (
          <div className="flex flex-col md:flex-row items-start gap-2">
            {renderCards(searchResult)}
          </div>
        );
      } else {
        return currentItems.map((select, index) => (
          <React.Fragment key={index}>
            {select.header === currentPath.name && (
              <div className="bg-cover mx-auto p-1 ">
                <Card
                  src={select.card_image}
                  title={select.title}
                  desc={select.description}
                  style={{
                    backgroundSize: "cover",
                  }}
                  onLink={() => handleLink(select.title)}
                  btnColor={sideBarColor.bgColor}
                  textColor={sideBarColor.textColor}
                />
              </div>
            )}
          </React.Fragment>
        ));
      }
    } else {
      if (searchResult && searchResult.length > 0) {
        return (
          <div className="flex flex-col md:flex-row items-start gap-2 ">
            {renderCards(searchResult)}
          </div>
        );
      } else {
        return (
          selectedItem &&
          businessTypes.map(
            (select, index) =>
              select.location === selectedItem.name && (
                <React.Fragment key={index}>
                  <div className="bg-cover mx-auto ">
                    <Card
                      src={select.card_image}
                      title={select.title}
                      desc={select.description}
                      style={{
                        backgroundSize: "cover",
                      }}
                      onLink={() => handleLink(select.title)}
                      btnColor={sideBarColor.bgColor}
                      textColor={sideBarColor.textColor}
                    />
                  </div>
                </React.Fragment>
              )
          )
        );
      }
    }
  }

  return null;
};

export default HandleCards;
