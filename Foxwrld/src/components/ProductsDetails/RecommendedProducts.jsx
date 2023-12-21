import React from 'react';
import ProductCard from './ProductCard';

export default function RecommendedProducts({ product }) {
  // Check if product is an object and has a valid product array property
  if (!product || !product.product || !Array.isArray(product.product) || product.product.length === 0) {
    // If product.product is empty, you can show a default message or value
    return <div className="text-center h-20 py-4">No recommended products available</div>;
  }

  return (
    <div className='my-28'>
      <div className='text-center p-10'>
        <p className='uppercase fontBold'>We recommend</p>
      </div>
      <div className='flex justify-center'>
        {product.product.map((p) => (
          <ProductCard key={p.id} image={p.frontImage} alternateImage={p.alternateImage} title={p.title} color={"3"} />
        ))}
      </div>
    </div>
  );
}
