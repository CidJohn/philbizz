import React, { useEffect, useState } from "react";
import List from "../../../../components/List/List";

function NavbarList(props) {
  const { navbar, handleNavbar } = props;
  const [navbarList, setViewNavbarList] = useState();

  useEffect(() => {
    setViewNavbarList(navbar);
  }, [navbar]);

  return (
    <div className="flex flex-col w-[30vw] max-h-[70vh] overflow-hidden hover:overflow-y-scroll">
      {navbarList &&
        navbarList.map((item, index) => (
          <React.Fragment key={index}>
            <List
              title={item.name}
              image={item.icons}
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
