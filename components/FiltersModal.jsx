import { SelectFilter } from '../components/SelectFilter'
import { PriceFilter } from '../components/PriceFilter'
import { usePriceFilter } from '../hooks/usePriceFilter'
import { useSelectFilter } from '../hooks/useSelectFilter'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

export const FiltersModal = () => {
  const { filters, setFilters, filtersData } = useContext(DataContext)

  const {
    onChangeFilter
  } = useSelectFilter({
    filters,
    setFilters
  })

  const {
    localPrice,
    onChangeMaxPrice,
    onChangeMinPrice,
    applyPriceFilter
  } = usePriceFilter({
    filters,
    setFilters,
    filtersData
  })

  return (
    <div className='absolute bg-white z-10 border-2 border-slate-600 p-2'>
      <SelectFilter label='Colors' 
        filterType='colors' 
        value={filters.colors} 
        optionList={filtersData.colors}
        onChangeFilter={onChangeFilter} />
      <SelectFilter label='Categories' 
        filterType='categories' 
        optionList={filtersData.categories}
        value={filters.categories} 
        onChangeFilter={onChangeFilter} />
      <div className="flex flex-col">
        <label className="text-lg">Price:</label>
        <PriceFilter currentPrice={localPrice.min}
          label="Min:" 
          onChangePrice={onChangeMinPrice} 
          maxPrice={filtersData.price.max}
          applyPriceFilter={applyPriceFilter} />
        <PriceFilter currentPrice={localPrice.max} 
          label="Max:"
          maxPrice={filtersData.price.max}
          onChangePrice={onChangeMaxPrice} 
          applyPriceFilter={applyPriceFilter} />
      </div>
    </div>
  )
}