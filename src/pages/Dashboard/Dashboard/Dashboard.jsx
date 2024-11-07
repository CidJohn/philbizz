import React, { useEffect, useState } from "react";
import DigitalClock from "../../../components/DigitalClock/DigitalClock";
import Calendar from "../../../components/Calendar/Calendar";
import Graph, { LineGraph } from "../../../components/Graph/Graph";
import { Commentdata, Likeddata, options } from "../../../content/cardContent";
import content from "../../../content/content.json";

function Dashboard(props) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className="p-5 min-w-full">
        <h1 className="text-2xl font-sans font-bold">Dashboard</h1>
        <div className="flex flex-row  p-2 gap-2 ">
          <div className="flex flex-col  rounded-lg  items-center ">
            <h1 className="text-2xl font-sans font-bold">Blog Analysis</h1>

            <div className="flex min-w-80 p-2 rounded-lg ">
              <div className="shadow-lg rounded-lg bg-gray-100  items-center justify-center min-w-full min-h-64 p-2 ">
                <Graph title={"Likes"} data={Likeddata} />
              </div>
            </div>
            <div className="flex min-w-80 p-2 rounded-lg ">
              <div className="shadow-lg rounded-lg bg-gray-100  items-center justify-center min-w-full min-h-64 p-2 ">
                <Graph title={"Comments"} data={Commentdata} />
              </div>
            </div>
          </div>
          <div className="flex flex-col   min-w-[40vw]   p-3">
            <h1 className="text-2xl font-sans font-bold text-center">
              Page Board
            </h1>
            <div className="flex  rounded-lg gap-2 ">
              <div className="flex flex-wrap  p-2 min-w-full ">
                <div className="z-10 flex min-w-full p-2 bg-gray-100  border-2 rounded-lg shadow-lg ">
                  <LineGraph title={"Page views"} data={options} />
                </div>
              </div>
            </div>
            <div className="flex p-2 gap-5 justify-center  ">
              {content.counter.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className=" p-3 rounded-lg w-[10vw] shadow-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    <h1 className="text-md font-sans font-bold border-b-2 border-gray-500 text-center">
                      {item.name}
                    </h1>
                    <p className="text-2xl text-center font-sans font-bold p-2">
                      {item.count}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full  gap-2">
            <h1 className="text-2xl font-sans font-bold text-center">
              Calendar
            </h1>
            <div className="flex flex-col p-2 bg-gray-100 w-full rounded-lg ">
              <Calendar onDateSelect={handleDateSelect} />
              {selectedDate && (
                <div className="mt-4">
                  Selected Date: {selectedDate.toDateString()}
                </div>
              )}
            </div>
            <div className="flex  rounded-lg bg-gray-100 justify-center shadow-lg border">
              <DigitalClock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
