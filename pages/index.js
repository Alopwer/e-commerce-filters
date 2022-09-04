import { useCallback, useEffect, useMemo, useState } from 'react'
import { data } from '../data'
import { usePagination } from '../hooks/usePagination'
import { Pagination } from '../components/Pagination'
import { Product } from '../components/Product'
import { FiltersModal } from '../components/FiltersModal'
import { DataContext } from '../context/DataContext'

export default function Home({ data, filtersData }) {
  const [state, setState] = useState(data.allContentfulProductPage.edges)
  const [filters, setFilters] = useState({
    colors: [],
    categories: [],
    price: {
      min: 0,
      max: filtersData.price.max
    }
  })

  const filterProduct = useCallback(({
    node,
    isAllColorSelected,
    isAllCategorySelected,
    isInitialPriceRange
  }) => {
    const isInColorFilter = isAllColorSelected || (node.colorFamily && node.colorFamily.some(
      color => filters.colors.includes(color.name)
    ))
    if (!isInColorFilter) return
    const isInCategoryFilter = isAllCategorySelected || (node.categoryTags && node.categoryTags.some(
      category => filters.categories.includes(category)
    ))
    if (!isInCategoryFilter) return
    const isInPriceRange = isInitialPriceRange || node.shopifyProductEu.variants.edges.some(
      ({ node }) => parseFloat(node.price) <= filters.price.max && parseFloat(node.price) >= filters.price.min
    )
    return isInPriceRange
  }, [filters])

  const {
    firstItemIdx,
    lastItemIdx,
    pagination,
    setPagination
  } = usePagination({
    data: state
  })

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: 1
    }))
    const isAllColorSelected = filters.colors.length === 0
    const isAllCategorySelected = filters.categories.length === 0
    const isInitialPriceRange = filters.price.min === 0 && filters.price.max === filtersData.price.max
    if (isAllColorSelected && isAllCategorySelected && isInitialPriceRange) {
      setState(data.allContentfulProductPage.edges)
      return
    }
    setState(data.allContentfulProductPage.edges.filter(
      ({ node }) => filterProduct({ node, isAllColorSelected, isAllCategorySelected, isInitialPriceRange })
    ))
  }, [data, filters])

  const productList = useMemo(() => 
    state.slice(firstItemIdx, lastItemIdx).map(({ node }) => <Product key={node.name} product={node} />),
    [state, firstItemIdx, lastItemIdx]
  )

  const [filtersModalOpen, setFiltersModalOpen] = useState(false)

  const openFilters = () => {
    setFiltersModalOpen((prevOpenState) => !prevOpenState)
  }
  
  return (
    <DataContext.Provider value={{ filters, filtersData, setFilters }}>
      <div className='relative'>
        <button className="text-slate-600 underline cursor-pointer text-lg mb-2" onClick={openFilters}>
          Filters
        </button>
        {
          filtersModalOpen && <FiltersModal />
        }
        <Pagination totalPages={pagination.totalPages} 
          setPagination={setPagination}
          currentPage={pagination.currentPage} />
        <div className='flex flex-wrap gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
          { productList.length ? productList : 'No products found' }
        </div>
      </div>
    </DataContext.Provider>
  )
}

export async function getStaticProps() {
  const filtersData = {
    colors: [],
    price: {
      min: 0,
      max: 0
    },
    categories: []
  }
  
  data.allContentfulProductPage.edges.forEach(({ node }) => {
    node.colorFamily?.forEach(color =>
      !filtersData.colors.includes(color.name.trim()) &&
      filtersData.colors.push(color.name.trim())
    )
    node.categoryTags?.forEach(category =>
      !filtersData.categories.includes(category.trim()) &&
      filtersData.categories.push(category.trim())
    )
    node.shopifyProductEu.variants.edges?.forEach(({ node }) => {
      if (parseFloat(node.price) > filtersData.price.max) {
        filtersData.price.max = parseFloat(node.price)
      }
    })
  })

  return {
    props: {
      data,
      filtersData
    },
  }
}
