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

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= 3) {
      // Render all pages if totalPages is 3 or less
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`2xl:w-8 2xl:h-8 h-7 w-7 leading-none flex justify-center items-center rounded-full border 2xl:text-[13px] text-[11px] font-gilroySemiBold ${
              currentPage === i
                ? "bg-black text-white"
                : "border-[#F1F1F1] hover:border-black text-[#333333]"
            }`}
            onClick={() => onPageChange(i)}
            aria-label={`Page ${i}`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Render first three pages
      for (let i = 1; i <= 3; i++) {
        buttons.push(
          <button
            key={i}
            className={`2xl:w-8 2xl:h-8 h-7 w-7 leading-none flex justify-center items-center rounded-full border 2xl:text-[13px] text-[11px] font-gilroySemiBold ${
              currentPage === i
                ? "bg-black text-white"
                : "border-[#F1F1F1] hover:border-black text-[#333333]"
            }`}
            onClick={() => onPageChange(i)}
            aria-label={`Page ${i}`}
          >
            {i}
          </button>
        );
      }

      // Add ellipsis if totalPages > 4
      if (totalPages > 4) {
        buttons.push(
          <span
            key="ellipsis"
            className="2xl:size-8 size-7 flex justify-center items-center border-[#F1F1F1]"
          >
            ...
          </span>
        );
      }

      // Add last page
      buttons.push(
        <button
          key={totalPages}
          className={`2xl:w-8 2xl:h-8 h-7 w-7 leading-none flex justify-center items-center rounded-full border 2xl:text-[13px] text-[11px] font-gilroySemiBold ${
            currentPage === totalPages
              ? "bg-black text-white"
              : "border-[#F1F1F1] hover:border-black text-[#333333]"
          }`}
          onClick={() => onPageChange(totalPages)}
          aria-label={`Page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <button
        className="2xl:size-8 size-7 flex justify-center leading-none items-center rounded-full border border-[#F1F1F1] hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        &laquo;
      </button>
      <button
        className="2xl:size-8 size-7 flex leading-none justify-center items-center rounded-full border border-[#F1F1F1] hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lsaquo;
      </button>

      {renderPageButtons()}

      <button
        className="2xl:size-8 size-7 leading-none flex justify-center items-center rounded-full border border-[#F1F1F1] hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &rsaquo;
      </button>
      <button
        className="2xl:size-8 size-7 leading-none flex justify-center items-center rounded-full border border-[#F1F1F1] hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
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
