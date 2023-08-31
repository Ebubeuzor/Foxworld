import React from 'react'
import ProductCard from './ProductCard'
import jacket1 from '../../assets/jacket1.jpeg';
import jacket2 from '../../assets/jacket2.jpeg';

export default function RecommendedProducts(product) {
  console.log(product);
  return (
    <div className='my-28'>
        <div className='text-center p-10'>
            <p className='uppercase fontBold '>We recommend</p>
        </div>
        <div className='flex   justify-center'>
        {product.product.map((p) => (
          <ProductCard image={p.frontImage} alternateImage={p.alternateImage} title={p.title} color={"3"} />
          
        ))
        }


        </div>
    </div>
  )
}
