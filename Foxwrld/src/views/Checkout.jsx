import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CheckOutCard from '../components/Checkout/CheckoutCard';

import Footer from '../components/Navigation/Footer';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axoisClient';
import Cookies from 'js-cookie';
import SkeletonLoader from '../components/SkeletonLoader';
import SkeletonCheckout from '../components/SkeletonCheckout';

export default function CheckOut() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {inCart,setIncart,user,setUser } = useStateContext();
  // Takes you back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true)
    axiosClient.get('/userCart')
    .then(({data}) => {
      setIncart(data.data)
      // console.log(data.data);
      setLoading(false)
    }).catch((e) => {
      // console.log(e);
    })
  },[])
  
  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    }).catch((e) => {
      // console.log(e);
    })
  },[])

  if (user.address1 == null || user.city == null || user.state == null) {
    return <Navigate to="/AccountAddress"/>
  }

  const allIds = Object.values(inCart).map(item => item.id);
  // console.log("hh "+allIds);

  Cookies.set('cartIds', JSON.stringify({allIds}), { expires: 7 }); 

  
  const totalSalePrice = Object.values(inCart).reduce((total, product) => {
    return total + parseFloat(product.product_id.salePrice);
  }, 0);

  const shipping = (5/100) * totalSalePrice;

  console.log(shipping);

  const initiatePaymentForAll = async () => {
    try {
      const response = await axiosClient.post('/payment/initiate-multiple', {
        cartItems: inCart,
      });

      if (response.data.payment_link) {
        window.location.href = response.data.payment_link;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };


  return (
    <div>
      <div>
        <section className='p-2'>
          <section className="header flex mx-auto">
            <button className='text-2xl' onClick={handleGoBack}>
              &#8592;
            </button>
            <Link className='mx-auto fontBold text-4xl'>
              Foxwrld
            </Link>
          </section>
          <div>
            {inCart.length > 0 && <section>
              <div>
                <div className="shopping-bag uppercase my-14 text-center font-bold">
                  shopping bag ({loading ? (
                    <span className="animate-pulse bg-gray-200 w-12 h-6 rounded"></span>
                  ) : (
                    inCart.length
                  )})
                </div>
  
                {loading ? (
                  <SkeletonCheckout /> // Display skeleton loader during loading
                ) : (
                  <div className="shopping-bag__container flex flex-wrap">
                    <div className="shopping-bag__products md:w-2/4 h-full md:h-[50vh] overflow-y-scroll">
                      {inCart && 
                        <CheckOutCard products={inCart}/>
                      }
                    </div>
                    <div className="shopping-bag__payment bg-gray-100 w-full md:w-2/4 p-5 md:h-[30vh] m-3 md:m-0">
                      <h2 className='text-lg font-bold mb-4'>Payment</h2>
                      <div className='flex justify-between'>
                        <p>Subtotal:</p>
                        <p>₦{totalSalePrice}</p>
                      </div>
                      <div className='flex justify-between'>
                        <p>Shipping:</p>
                        <p>₦{shipping}</p>
                      </div>
                      <hr className='my-4' />
                      <div className='flex justify-between'>
                        <p className='font-bold'>Total:</p>
                        <p className='font-bold'>₦{totalSalePrice + shipping}</p>
                      </div>
                      <button className='bg-black text-white py-2 px-4 mt-4 rounded w-full uppercase' onClick={() => initiatePaymentForAll()}>Checkout</button>
                    </div>
                  </div>
                )}
              </div>
            </section>}

            {inCart.length === 0 && <div className='text-black text-center pt-5 pb-8'>
                No Product In Your Cart 
              </div>}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
  
}
