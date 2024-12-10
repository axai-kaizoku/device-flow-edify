interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center justify-center gap-2  w-full ">
      <button
        className="size-8 flex justify-center items-center rounded-full border border-gray-300 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        &laquo;
      </button>
      <button
        className="size-8 flex justify-center items-center rounded-full border border-gray-300 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lsaquo;
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`size-8 flex justify-center items-center rounded-full border ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
          onClick={() => onPageChange(index + 1)}
          aria-label={`Page ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="size-8 flex justify-center items-center rounded-full border border-gray-300 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &rsaquo;
      </button>
      <button
        className="size-8 flex justify-center items-center rounded-full border border-gray-300 hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
