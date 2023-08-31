import React from 'react';
import sandals from '../../assets/sandals.jpeg';
import { Link } from 'react-router-dom';

export default function CartProducts({ product }) {
  // console.log(product);
  product.map((item) => {
    // console.log(item);
  })

  return (
    <div className="shadow-lg w-full">
      {product.map((item) => (
        <div key={item.id} className="flex flex-col w-[300px] p-4 overflow-scroll h-[100px]">
          <div className="flex items-center mb-2">
            <img src={item.product_id.frontImage} alt="sandals" className="w-14 h-14 object-contain mr-2" />
            <div className="flex flex-col">
              <p className="font-bold text-sm">{item.product_id.title}</p>
              <p className="text-sm fontThin">Quantity: 1</p>
              <p className="fontThin text-sm">Subtotal: ₦{item.product_id.salePrice}</p>
            </div>
          </div>
        </div>
      ))}

      {product.length > 0 && <Link to="/Checkout" className="block w-full">
        <button className="bg-black text-white py-2 px-4 mt-2 w-full">
          Checkout
        </button>
      </Link>}

      {product.length === 0 && <Link to="/Checkout" className="block w-full">
        <button className="bg-black text-white py-2 px-4 mt-2 w-full">
          No Product In Cart
        </button>
      </Link>}
    </div>
  );
}
