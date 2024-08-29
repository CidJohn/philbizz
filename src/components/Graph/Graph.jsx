import React from "react";

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
                className="flex-1 flex flex-col-reverse text-center "
              >
                <div
                  className="rounded-b-md"
                  style={{
                    height: `${percentage}%`,
                    backgroundColor: getColor(percentage),
                  }}
                ></div>
                <p className="mt-2 text-sm text-gray-700">{item.label}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center space-y-2 ml-4 ">
          {legendData.map((item, index) => (
            <div key={index} className="flex  space-x-2">
              <div
                className={`w-4 h-4 rounded `}
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

export default Graph;
