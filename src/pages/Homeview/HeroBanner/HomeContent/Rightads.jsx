import React from "react";
import Calendar from "../../../../components/Calendar/Calendar";

const Rightads = (props) => {
  const { handleDateSelect, selectedDate } = props;

  return (
    <div className='mt-4'>
      <div className='transform transition-transform duration-500 hover:scale-105 '>
        <h1 className='text-4xl p-2 fira-sans-bold text-[#013A63]'>Calendar</h1>
        <Calendar onDateSelect={handleDateSelect} />
        {selectedDate && (
          <div className='mt-4'>
            Selected Date: {selectedDate.toDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rightads;
