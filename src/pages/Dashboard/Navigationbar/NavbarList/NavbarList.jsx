import React from "react";
import List from "../../../../components/List/List";

function NavbarList(props) {
  const { navbar, handleNavbar } = props;
  return (
    <div className="flex flex-col w-[30vw] max-h-[70vh] overflow-hidden hover:overflow-y-scroll">
      {navbar &&
        navbar.map((item, index) => (
          <React.Fragment key={index}>
            <List
              title={item.name}
              image={item.iconPath}
              desc={item.path}
              imgstyle={{ width: "10vw" }}
              onLink={() => handleNavbar(item)}
            />
          </React.Fragment>
        ))}
    </div>
  );
}

export default NavbarList;
