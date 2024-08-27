import React from "react";

function Dashboard() {
  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl  font-bold">Dashboard</h1>
        <div className="flex flex-wrap  p-5 gap-4 justify-center">
          <div className="flex border-2 w-64 h-64 border-dashed rounded-lg "></div>
          <div className="flex border-2 w-64 h-64 border-dashed rounded-lg "></div>
          <div className="flex border-2 w-64 h-64 border-dashed rounded-lg "></div>
          <div className="flex border-2 w-64 h-64 border-dashed rounded-lg "></div>
          <div className="flex border-2 w-64 h-64 border-dashed rounded-lg "></div>
          <div className="flex border-2 w-64 h-64 border-dashed rounded-lg "></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
