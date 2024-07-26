import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, link }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, 5);
    }

    if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <a
            href={`#${link}`}
            onClick={() => onPageChange(i)}
            className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              i === currentPage
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                : "text-gray-500 bg-white"
            }`}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href={`#${link}`}
            onClick={handleFirstPage}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            First
          </a>
        </li>
        <li>
          <a
            href={`#${link}`}
            onClick={handlePrevPage}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Previous
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a
            href={`#${link}`}
            onClick={handleNextPage}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Next
          </a>
        </li>
        <li>
          <a
            href={`#${link}`}
            onClick={handleLastPage}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
