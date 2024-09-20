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
}) => {
  const { businessTypes, searchload } = useCardSettings(
    currentPath.businessPath
  );

  console.log(navbar);

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
      <div className="bg-cover mx-auto mt-5" key={index}>
        <div className="flex">
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
      </div>
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
          <div className="flex flex-col md:flex-row items-start">
            {renderCards(searchResult)}
          </div>
        );
      } else {
        return currentItems.map((select, index) => (
          <React.Fragment key={index}>
            {select.header === currentPath.name && (
              <div className="bg-cover mx-auto p-2 rounded">
                <Card
                  src={select.card_image}
                  title={select.title}
                  desc={select.description}
                  style={{
                    width: "200px",
                    backgroundSize: "cover",
                    height: "350px",
                  }}
                  hidden={true}
                  onLink={() => handleLink(select.title)}
                />
              </div>
            )}
          </React.Fragment>
        ));
      }
    } else {
      if (searchResult && searchResult.length > 0) {
        return (
          <div className="flex flex-col md:flex-row items-start">
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
                  <div className="bg-cover p-2">
                    <Card
                      src={select.card_image}
                      title={select.title}
                      desc={select.description}
                      style={{
                        width: "200px",
                        backgroundSize: "cover",
                        height: "350px",
                      }}
                      hidden={true}
                      onLink={() => handleLink(select.title)}
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
