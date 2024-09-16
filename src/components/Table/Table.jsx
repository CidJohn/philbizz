import React from "react";
import Dateformat from "../Dateformat/Dateformat";

const Table = (props) => {
  const { tblheader, tbldata, tblrow, onView, onDelete, onUpdate } = props
  return (
    <div className="relative overflow-hidden hover:overflow-x-auto hover:overflow-y-scroll">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            {tblheader.map((header, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {header}
              </th>
            ))}
            {onView || onDelete ? (
              <th scope="col" className="px-6 py-3 sticky right-0 ">
                Actions
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {tbldata
            ? tbldata.map((data, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                >
                  <td className="px-6 py-4">{rowIndex + 1}</td>
                  {tblrow.map((row, cellIndex) => (
                    <td className="px-6 py-4  text-wrap" key={cellIndex}>
                      {row.includes("created_at") ? (
                        <Dateformat dateString={data[row]} />
                      ) : (
                        data[row] || "N/A"
                      )}
                    </td>
                  ))}
                  {onView || onDelete || onUpdate ? (
                    <td className="px-6 py-4 flex space-x-2 sticky right-0 bg-white">
                      {onUpdate && (
                        <button
                          onClick={() => onUpdate(data)}
                          className="text-green-600 hover:underline"
                        >
                          Update
                        </button>
                      )}
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
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
