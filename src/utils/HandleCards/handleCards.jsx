import React from "react";
import Card from "../../components/Card/Card";
import selectionContent from "../../content/selectionContent";

const HandleCards = ({
  currentPath,
  selectedItem,
  currentItems,
  currentPage,
  itemsPerPage,
}) => {
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
                    (setting.ids = selectedItem.id &&
                      setting.location === selectedItem.name && (
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
          {select.path === "Ktv/Jtv" &&
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
