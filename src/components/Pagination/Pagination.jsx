import clsx from "clsx";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import css from "./Pagination.module.css";

export default function Pagination({
  totalPages,
  page,
  handleGoPage,
  handleBack,
  handleFront,
}) {
  const renderPages = () => {
    const pages = [];
    const visiblePageCount = 1;

    if (page >= 1) {
      pages.push(
        <button
          type="button"
          onClick={() => handleGoPage(1)}
          key={1}
          className={clsx(css.page, { [css.currentPage]: 1 === page })}
        >
          1
        </button>
      );
    }

    if (page > visiblePageCount + 1) {
      pages.push(<span key="ellipsis1">...</span>);
    }

    for (
      let i = Math.max(2, page - visiblePageCount);
      i <= Math.min(totalPages - 1, page + visiblePageCount);
      i++
    ) {
      pages.push(
        <button
          type="button"
          onClick={() => handleGoPage(i)}
          key={i}
          className={clsx(css.page, { [css.currentPage]: i === page })}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages - visiblePageCount) {
      pages.push(<span key="ellipsis2">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          type="button"
          onClick={() => handleGoPage(totalPages)}
          key={totalPages}
          className={clsx(css.page, { [css.currentPage]: totalPages === page })}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={css.buttonWrap}>
      <button type="button" onClick={handleBack} disabled={page <= 1}>
        <FaCircleChevronLeft size={20} />
      </button>
      {renderPages()}
      <button type="button" onClick={handleFront} disabled={page >= totalPages}>
        <FaCircleChevronRight size={20} />
      </button>
    </div>
  );
}
