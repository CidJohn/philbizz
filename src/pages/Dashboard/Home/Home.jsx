import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Menus from "../Menus/Menus";
import { useLocation } from "react-router-dom";
import Accounts from "../Accounts/Accounts";

function Home() {
  const location = useLocation();
  const loc = location.hash;

  return (
    <div className="flex flex-col">
      {(!loc || loc === "#dashboard" || loc === "#card") && (
        <section id="dashboard">
          <Dashboard />
        </section>
      )}
      {loc === "#menus" && (
        <section id="menus">
          <Menus />
        </section>
      )}
      {loc === "#users" && (
        <section id="users">
          <Accounts />
        </section>
      )}
    </div>
  );
}

export default Home;
