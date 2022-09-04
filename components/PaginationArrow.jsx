export const PaginationArrow = ({
  onClickHandler,
  isDisabled,
  label
}) => {
  return (
    <button className={`bg-slate-100 p-2 mx-1 ${isDisabled && 'cursor-not-allowed'}`} 
      onClick={onClickHandler}>
        { label }
    </button>
  )
}