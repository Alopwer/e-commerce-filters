import Image from 'next/image'
import { memo } from 'react'

export const Product = memo(({
  product
}) => {
  return (
    <div className='max-w-lg relative'>
      <Image src={`https:${product.thumbnailImage.file.url}`} layout="responsive" width="400" height="400" />
      <div>
        <div className='flex justify-between'>
          <span className='truncate' title={product.name}>{product.name}</span>
          <span>{product.shopifyProductEu.variants.edges[0].node.price}</span>
        </div>
        <span>{product.categoryTags && product.categoryTags[0]}</span>
      </div>
    </div>
  )
}, (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps))