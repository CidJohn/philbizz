import React from "react";

const Table = ({ tblheader, tbldata, tblrow, onView, onDelete }) => {
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
            {onView || onDelete ? (
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            ) : (
              ""
            )}
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
              {onView || onDelete ? (
                <td className="px-6 py-4 flex space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(data)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(data)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
