import React from "react";
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

  const renderCards = (items) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <div className="bg-cover mx-auto ">
          <Card
            src={item.title_image}
            title={item.title}
            desc={item.description}
            style={{
              backgroundSize: "cover",
            }}
            hidden={true}
            onLink={() => handleLink(item)}
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

    if (searchResult && searchResult.length > 0) {
      return renderCards(searchResult);
    } else {
      if (selectedItem) {
        return currentItems.map((item, index) =>
          item.location === selectedItem.name && (
            <React.Fragment key={index}>
              <div className="bg-cover mx-auto ">
                <Card
                  src={item.title_image}
                  title={item.title}
                  desc={item.description}
                  style={{
                    backgroundSize: "cover",
                  }}
                  onLink={() => handleLink(item)}
                  btnColor={sideBarColor ? sideBarColor.bgColor : "#E639460D"}
                  textColor={sideBarColor ? sideBarColor.textColor : "#E63946"}
                  theme={sideBarColor ? sideBarColor.theme : ""}
                />
              </div>
            </React.Fragment>
          )
        );
      } else {
        return currentItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className="bg-cover mx-auto ">
              <Card
                src={item.title_image}
                title={item.title}
                desc={item.description}
                style={{
                  backgroundSize: "cover",
                }}
                onLink={() => handleLink(item)}
                btnColor={sideBarColor ? sideBarColor.bgColor : "#E639460D"}
                textColor={sideBarColor ? sideBarColor.textColor : "#E63946"}
                theme={sideBarColor ? sideBarColor.theme : ""}
              />
            </div>
          </React.Fragment>
        ));
      }
    }
  }

  return null;
};

export default HandleCards;
