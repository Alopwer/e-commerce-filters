import { memo } from 'react'
import { filtersData } from '../data'

export const SelectFilter = memo(({
  label,
  filterType,
  value,
  onChangeFilter,
  optionList
}) => {
  return <div className="flex flex-col mb-2">
    <label htmlFor={ label } className="mb-1 text-lg">{ label }:</label>
    <select
      id={ label }
      multiple 
      onClick={(e) => onChangeFilter(e, filterType)} 
      onChange={() => {}}
      value={value}
    >
      {
        optionList.map(item =>
          <option key={item} value={item}>{ item }</option>
        )
      }
    </select>
  </div>
})