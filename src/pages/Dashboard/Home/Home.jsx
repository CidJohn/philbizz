import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Menus from "../Menus/Menus";
import { useLocation } from "react-router-dom";
import Accounts from "../Accounts/Accounts";
import Inbox from "../Inbox/Inbox";
import Archived from "../Archived/Archived";

function Home(props) {
  const location = useLocation();
  const loc = location.hash;

  return (
    <div className="flex flex-col">
      {(!loc || loc === "#dashboard" || loc === "#card") && (
        <section id="dashboard">
          <Dashboard />
        </section>
      )}
      {loc === "#users" && (
        <section id="users">
          <Accounts />
        </section>
      )}
      {loc === "#inbox" && (
        <section id="inbox">
          <Inbox />
        </section>
      )}
      {loc === "#archived" && (
        <section id="archived">
          <Archived />
        </section>
      )}
    </div>
  );
}

export default Home;
