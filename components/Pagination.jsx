import { memo } from "react"
import { PaginationArrow } from "./PaginationArrow"

export const Pagination = memo(({
  totalPages,
  setPagination,
  currentPage
}) => {
  const onChangePage = (pageNumber) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: pageNumber
    }))
  }

  const goPrevPage = () => {
    const newPage = currentPage - 1
    newPage > 0 && onChangePage(newPage)
  }

  const goNextPage = () => {
    const newPage = currentPage + 1
    newPage <= totalPages && onChangePage(newPage)
  }

  return <div className="mb-3">
    <PaginationArrow onClickHandler={goPrevPage} label='&lt;' isDisabled={currentPage - 1 <= 0} />
    { currentPage }
    <PaginationArrow onClickHandler={goNextPage} label='&gt;' isDisabled={currentPage + 1 > totalPages} />
  </div>
})