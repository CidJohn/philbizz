import React from "react";
import sampleItem from "../../../content/sampleItem";
import Table from "../../../components/Table/Table";

function Accounts() {
  const handleView = (data) => {
    console.log("View:", data);
  };

  const handleDelete = (data) => {
    console.log("Delete:", data);
  };

  return (
    <div className="flex flex-wrap p-5  gap-2">
      <div className="flex flex-col bg-gray-100 rounded-lg shadow-lg p-2 min-w-[70vh] max-h-[90vh] overflow-y-scroll">
        <h1 className="text-2xl font-bold p-2">User list</h1>
        <div className="flex flex-col justify-center min-w-80 ">
          <Table
            tblheader={["Name", "Email"]}
            tbldata={sampleItem}
            tblrow={["name", "email"]}
            onView={handleView}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <div className="flex flex-col min-w-[70vh] max-h-[90vh] bg-gray-100 rounded-lg shadow-lg p-2 overflow-y-scroll">
        <h1 className="text-2xl font-bold p-2">View Profile</h1>
        {/* Content for View Profile */}
      </div>
    </div>
  );
}

export default Accounts;
