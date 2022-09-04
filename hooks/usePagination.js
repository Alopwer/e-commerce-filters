import { useEffect, useState } from "react"

export const usePagination = ({
  data
}) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10
  })

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      totalPages: Math.ceil(data.length / prevPagination.pageSize)
    }))
  }, [data])

  const lastItemIdx = pagination.currentPage * pagination.pageSize
  const firstItemIdx = lastItemIdx - pagination.pageSize

  return {
    pagination,
    setPagination,
    lastItemIdx,
    firstItemIdx
  }
}