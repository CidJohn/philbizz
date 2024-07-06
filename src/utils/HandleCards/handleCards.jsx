import React from "react";
import Card from "../../components/Card/Card";
import selectionContent from "../../content/selectionContent";
import Description from "../../pages/Selection/Description/Description";
import useCardSettings from "../../helper/database/useCardSettings";

const HandleCards = ({
  currentPath,
  selectedItem,
  currentItems,
  currentPage,
  itemsPerPage,
  selectPath,
}) => {
  const { businessTypes } = useCardSettings(currentPath.businessPath);

  if (currentPath.name === "Food") {
    if (!selectedItem.id) {
      return currentItems.map((select, index) => (
        <React.Fragment key={index}>
          {select.path === "Food" &&
            select.cardSetting.map((setting, settingIndex) => (
              <div className="flex flex-wrap mt-5" key={settingIndex}>
                {setting.settings.map((card, cardIndex) => (
                  <div className="bg-cover" key={cardIndex}>
                    <Card
                      src={card.images}
                      title={card.title}
                      desc={card.desc}
                      style={{ width: "200px", backgroundSize: "cover" }}
                      hidden={true}
                    />
                  </div>
                ))}
              </div>
            ))}
        </React.Fragment>
      ));
    } else {
      return (
        selectedItem &&
        selectionContent.map(
          (select, index) =>
            (select.path = selectedItem.path && (
              <React.Fragment key={index}>
                {select.cardSetting.map(
                  (setting, settingIndex) =>
                    (setting.location = selectedItem.name &&
                      setting.ids === selectedItem.id && (
                        <div className="flex flex-wrap mt-5" key={settingIndex}>
                          {setting.settings
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((card, cardIndex) => (
                              <div className="bg-cover" key={cardIndex}>
                                <Card
                                  src={card.images}
                                  title={card.title}
                                  desc={card.desc}
                                  style={{
                                    width: "200px",
                                    backgroundSize: "cover",
                                  }}
                                  hidden={true}
                                />
                              </div>
                            ))}
                        </div>
                      ))
                )}
              </React.Fragment>
            ))
        )
      );
    }
  }
  if (currentPath.name === "Ktv/Jtv") {
    if (!selectedItem.id) {
      return currentItems.map((select, index) => (
        <React.Fragment key={index}>
          {select.header === "Ktv/Jtv" && (
            <div className="bg-cover  mx-auto " key={index}>
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
              />
            </div>
          )}
        </React.Fragment>
      ));
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
                  />
                </div>
              </React.Fragment>
            )
        )
      );
    }
  }
  if (currentPath.name === "Business") {
    if (!selectedItem.id) {
      return currentItems.map((select, index) => (
        <React.Fragment key={index}>
          {select.path === "Business" &&
            select.cardSetting.map((setting, settingIndex) => (
              <div className="flex flex-wrap mt-5" key={settingIndex}>
                {setting.settings.map((card, cardIndex) => (
                  <div className="bg-cover" key={cardIndex}>
                    <Card
                      src={card.images}
                      title={card.title}
                      desc={card.desc}
                      style={{ width: "200px", backgroundSize: "cover" }}
                      hidden={true}
                    />
                  </div>
                ))}
              </div>
            ))}
        </React.Fragment>
      ));
    } else {
      return (
        selectedItem &&
        selectionContent.map(
          (select, index) =>
            (select.path = selectedItem.path && (
              <React.Fragment key={index}>
                {select.cardSetting.map(
                  (setting, settingIndex) =>
                    (setting.location = selectedItem.name &&
                      setting.ids === selectedItem.id && (
                        <div className="flex flex-wrap mt-5" key={settingIndex}>
                          {setting.settings
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((card, cardIndex) => (
                              <div className="bg-cover" key={cardIndex}>
                                <Card
                                  src={card.images}
                                  title={card.title}
                                  desc={card.desc}
                                  style={{
                                    width: "200px",
                                    backgroundSize: "cover",
                                  }}
                                  hidden={true}
                                />
                              </div>
                            ))}
                        </div>
                      ))
                )}
              </React.Fragment>
            ))
        )
      );
    }
  }
  return null;
};

export default HandleCards;
