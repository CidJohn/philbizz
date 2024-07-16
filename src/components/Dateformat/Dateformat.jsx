import React from "react";

const Dateformat = ({ dateString }) => {
  const formattedDate = formatDate(dateString);

  return <span>{formattedDate}</span>;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
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
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default Dateformat;
