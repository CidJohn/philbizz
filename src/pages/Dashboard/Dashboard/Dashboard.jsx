import React, { useEffect, useState } from "react";
import DigitalClock from "../../../components/DigitalClock/DigitalClock";
import Calendar from "../../../components/Calendar/Calendar";
import Graph, { LineGraph } from "../../../components/Graph/Graph";
import { Commentdata, Likeddata, options } from "../../../content/cardContent";

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl  font-bold">Dashboard</h1>
        <div className="flex flex-wrap  p-2 gap-2">
          <div className="flex flex-col  rounded-lg  items-center">
            <h1 className="text-2xl  font-bold">Blog Analysis</h1>

            <div className="flex min-w-80 p-2 rounded-lg ">
              <div className="shadow-lg rounded-lg bg-gray-100  items-center justify-center min-w-full min-h-64 p-2 transform transition-transform duration-500 hover:scale-105">
                <Graph title={"Likes"} data={Likeddata} />
              </div>
            </div>
            <div className="flex min-w-80 p-2 rounded-lg ">
              <div className="shadow-lg rounded-lg bg-gray-100  items-center justify-center min-w-full min-h-64 p-2 transform transition-transform duration-500 hover:scale-105">
                <Graph title={"Comments"} data={Commentdata} />
              </div>
            </div>
          </div>
          <div className="flex flex-col   min-w-64 ">
            <h1 className="text-2xl  font-bold text-center">Page Board</h1>
            <div className="flex  rounded-lg gap-2 ">
              <div className="flex flex-wrap  p-2 min-w-full ">
                <div className="z-10 flex min-w-full p-2 bg-gray-100  border-2 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
                  <LineGraph title={"Page views"} data={options} />
                </div>
              </div>
            </div>
            <div className="flex flex-row  gap-2 ">
              <div className="flex flex-col p-2 bg-gray-100  rounded-lg transform transition-transform duration-500 hover:scale-105">
                <Calendar onDateSelect={handleDateSelect} />
                {selectedDate && (
                  <div className="mt-4">
                    Selected Date: {selectedDate.toDateString()}
                  </div>
                )}
              </div>
              <div className="flex p-2 rounded-lg bg-gray-100 transform transition-transform duration-500 hover:scale-105 shadow-lg border">
                <DigitalClock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
