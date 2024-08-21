import React, { useState } from "react";

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="flex-1" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      daysArray.push(
        <button
          key={day}
          onClick={() => onDateSelect(new Date(year, month, day))}
          className={`flex-1 p-2 text-center hover:bg-blue-200 focus:outline-none ${
            isToday ? "bg-blue-500 text-white rounded-full" : ""
          }`}
        >
          {day}
        </button>
      );
    }

    return daysArray;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between p-4 bg-white-500 text-gray-900 rounded-t-lg">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div className="gap-1">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 p-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="flex-1 text-center font-bold">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
