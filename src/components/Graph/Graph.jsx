import React, { useState } from "react";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { options } from "../../content/cardContent";
import Dropdown from "../Dropdown/Dropdown";

const Graph = ({ title, data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  const getColor = (percentage) => {
    if (percentage === 100) return "#0000FF"; // 100% - Blue
    if (percentage >= 75) return "#ADD8E6"; // 75% - Light Blue
    if (percentage >= 50) return "#008000"; // 50% - Green
    if (percentage >= 25) return "#FFFF00"; // 25% - Yellow
    return "#FF0000"; // 0% - Red
  };

  const legendData = [
    { label: "0%", color: "#FF0000" }, // Red
    { label: "25%", color: "#FFFF00" }, // Yellow
    { label: "50%", color: "#008000" }, // Green
    { label: "75%", color: "#ADD8E6" }, // Light Blue
    { label: "100%", color: "#0000FF" }, // Blue
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        {title}
      </h2>
      <div className="flex justify-between">
        <div className="flex space-x-4 min-h-64 border p-2">
          {data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col-reverse text-center"
              >
                <div
                  className="rounded-b-md"
                  style={{
                    height: `${percentage}%`,
                    backgroundColor: getColor(percentage),
                  }}
                ></div>
                <p className="mt-2 text-xs text-gray-700 flex flex-col">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center space-y-2 ml-4">
          {legendData.map((item, index) => (
            <div key={index} className="flex space-x-2">
              <div
                className={`w-4 h-4 rounded`}
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LineGraph = ({ title, data }) => {
  const [selectedSeries, setSelectedSeries] = useState([
    data.series[0],
    data.series[1],
  ]);

  const [timePeriod, setTimePeriod] = useState("Last 7 Days");

  const handleSeriesChange = (value) => {
    const selected = data.series.find((series) => series.name === value);
    setSelectedSeries([selectedSeries[1], selected]);
  };

  const handleTimePeriodChange = (value) => {
    setTimePeriod(value);
    console.log("Selected Time Period:", value);
  };
  const days = [
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "Last 90 Days", label: "Last 90 Days" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "Today", label: "Today" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h5>
        <Dropdown
          name="timePeriod"
          value={timePeriod}
          onChange={(e) => handleTimePeriodChange(e.target.value)}
          options={days}
          placeholder={timePeriod}
        />
      </div>
      <div id="area-chart">
        <ReactApexChart
          options={data}
          series={selectedSeries}
          type="area"
          height="350"
        />
      </div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <div className="flex">
            <Dropdown
              name="series"
              value={selectedSeries[1].name}
              onChange={(e) => handleSeriesChange(e.target.value)}
              options={data.series.map((series) => ({
                value: series.name,
                label: series.name,
              }))}
              placeholder={selectedSeries[1].name}
            />
          </div>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Page Report
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Graph;
