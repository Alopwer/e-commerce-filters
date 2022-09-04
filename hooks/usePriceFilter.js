import { useCallback, useState } from 'react'

export const usePriceFilter = ({
  filters,
  setFilters,
  filtersData
}) => {
  const [localPrice, setLocalPrice] = useState({
    min: 0,
    max: filtersData.price.max
  })

  const onChangeMinPrice = useCallback((event) => {
    const minPrice = parseFloat(event.target.value || 0)
    if (minPrice > localPrice.max) return
    setLocalPrice((prevPrice) => ({
      min: minPrice,
      max: prevPrice.max
    }))
  }, [localPrice, setLocalPrice])

  const onChangeMaxPrice = useCallback((event) => {
    const maxPrice = parseFloat(event.target.value || 0)
    if (maxPrice < localPrice.min) return
    setLocalPrice((prevPrice) => ({
      min: prevPrice.min,
      max: maxPrice
    }))
  }, [localPrice, setLocalPrice])

  const applyPriceFilter = useCallback(() => {
    setFilters({
      ...filters,
      price: {
        min: localPrice.min,
        max: localPrice.max
      }
    })
  }, [filters, setFilters, localPrice])

  return {
    localPrice,
    onChangeMaxPrice,
    onChangeMinPrice,
    applyPriceFilter
  }
}