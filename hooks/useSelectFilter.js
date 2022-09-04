import { useCallback } from "react"

export const useSelectFilter = ({
  filters,
  setFilters
}) => {
  const handleFilterChange = useCallback(({ target: { value } }, filterType) => {
    const foundFilterIdx = filters[filterType].findIndex((name) => name === value)
    if (foundFilterIdx !== -1) {
      setFilters((filtersState) => ({
        ...filtersState,
        [filterType]: [
          ...filtersState[filterType].slice(0, foundFilterIdx),
          ...filtersState[filterType].slice(foundFilterIdx + 1),
        ]
      }))
      return;
    }
    setFilters((filtersState) => ({
      ...filtersState,
      [filterType]: [
        ...filtersState[filterType],
        value
      ]
    }))
  }, [filters, setFilters])

  const onChangeFilter = useCallback((event, filterType) => {
    if (filters[filterType].includes(event.target.value) && filters[filterType].length === 1) {
      setFilters({
        ...filters,
        [filterType]: []
      })
    } else {
      handleFilterChange(event, filterType)
    }
  }, [filters, setFilters, handleFilterChange])

  return {
    filters,
    setFilters,
    onChangeFilter
  }
}