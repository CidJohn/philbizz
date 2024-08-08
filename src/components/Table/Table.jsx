import React from "react";

const Table = ({ tblheader, tbldata, tblrow }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tblheader.map((header, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbldata.map((data, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {tblrow.map((row, cellIndex) => (
                <td className="px-6 py-4" key={cellIndex}>
                  {data[row] || "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
