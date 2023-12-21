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
      console.log(data.data);
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
  Cookies.set('userid', JSON.stringify({
    'user':user.id
  }), { expires: 7 }); 

  
  const totalSalePrice = Object.values(inCart).reduce((total, product) => {
    return total + parseFloat(product.product_id.salePrice);
  }, 0);

  const shipping = (5/100) * totalSalePrice;

  // console.log(shipping);

  const initiatePaymentForAll = async () => {
    try {
      setLoading(true); // Set loading to true when initiating payment
      const response = await axiosClient.post('/payment/initiate-multiple', {
        cartItems: inCart,
      });

      if (response.data.payment_link) {
        window.location.href = response.data.payment_link;
      }
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Set loading back to false after the payment process is complete (success or failure)
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
                  <div className="shopping-bag__container flex  flex-wrap">
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

            {inCart.length === 0 && <div className='text-black h-[70vh] pt-5 pb-8 flex flex-col justify-center text-center'>
            <div className="flex flex-col items-center justify-center ">
              <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>

                </div>
              <div className="mt-10">
              No Product In Your Cart 
                </div>
              </div>}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
  
}
