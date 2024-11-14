import React from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import Images from "../../../../components/Image/Images";

const Rightads = (props) => {
  const { socialContent, handleDateSelect, selectedDate } = props;

  return (
    <div className="mt-4">
      <div className="transform transition-transform duration-500 hover:scale-105 ">
        <h1 className="text-4xl p-2 fira-sans-bold text-[#013A63]">Calendar</h1>
        <Calendar onDateSelect={handleDateSelect} />
        {selectedDate && (
          <div className="mt-4">
            Selected Date: {selectedDate.toDateString()}
          </div>
        )}
      </div>
      <div className="mt-5 rounded-lg shadow-lg p-3 bg-[#013A63]/5">
        <h1 className="text-4xl p-2 fira-sans-bold text-[#013A63]">
          Social media
        </h1>
        {socialContent.map((item, index) => (
          <div className="flex " key={index}>
            <a
              href={item.link}
              className="transform  transition-transform duration-500 hover:scale-105 p-5"
            >
              <Images src={item.imageURL} style={{ width: "250px" }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightads;
