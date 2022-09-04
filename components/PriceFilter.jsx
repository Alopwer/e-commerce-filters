import { memo } from 'react'
import { filtersData } from '../data'

export const PriceFilter = memo(({
  label,
  currentPrice,
  applyPriceFilter,
  onChangePrice,
  maxPrice
}) => {
  return (
    <div className="flex items-center">
      <label htmlFor={ label } className="mr-2">{ label }</label>
      <input type="range"
        className='mr-2' 
        id={ label }
        min="0"
        max={maxPrice} 
        value={currentPrice}
        onMouseUp={applyPriceFilter}
        onChange={onChangePrice} />
      <span>{ currentPrice }</span>
    </div>
  )
})