import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  pages: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ pages, setPageNumber }) => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected + 1);
  };

  return (
    <ReactPaginate
      className="paginate"
      pageCount={pages}
      onPageChange={handlePageChange}
    />
  );
};

export default Pagination;
