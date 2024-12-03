import React from "react";
import Spinner from "../../../components/Spinner/Spinner";
import Card from "../../../components/Card/Card";

const HandleCards = (props) => {
  const {
    currentPath,
    selectedItem,
    currentItems,
    searchError,
    searchResult,
    handleLink,
    navbar,
    sideBarColor,
    currentCardItem,
  } = props;

  if (!currentItems && !currentCardItem) {
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
            src={item.title_image}
            title={item.title}
            desc={item.address}
            style={{
              width: "240px",
              backgroundSize: "cover",
            }}
            hidden={true}
            onLink={() => handleLink(item.title)}
            btnColor={sideBarColor ? sideBarColor.bgColor : "#E639460D"}
            textColor={sideBarColor ? sideBarColor.textColor : "#E63946"}
            theme={sideBarColor ? sideBarColor.theme : ""}
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
        return currentCardItem.map((item, index) => (
          <React.Fragment key={index}>
            <div className="bg-cover mx-auto ">
              <Card
                src={item.title_image}
                title={item.title}
                desc={item.address}
                style={{
                  backgroundSize: "cover",
                }}
                onLink={() => handleLink(item.title)}
                btnColor={sideBarColor ? sideBarColor.bgColor : "#E639460D"}
                textColor={sideBarColor ? sideBarColor.textColor : "#E63946"}
                theme={sideBarColor ? sideBarColor.theme : ""}
              />
            </div>
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
          currentItems.map(
            (item, index) =>
              item.location === selectedItem.name && (
                <React.Fragment key={index}>
                  <div className="bg-cover mx-auto ">
                    <Card
                      src={item.title_image}
                      title={item.title}
                      desc={item.address}
                      style={{
                        backgroundSize: "cover",
                      }}
                      onLink={() => handleLink(item.title)}
                      btnColor={
                        sideBarColor ? sideBarColor.bgColor : "#E639460D"
                      }
                      textColor={
                        sideBarColor ? sideBarColor.textColor : "#E63946"
                      }
                      theme={sideBarColor ? sideBarColor.theme : ""}
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
