import React, { useEffect, useState } from 'react';
import Header from '../Navigation/Header';
import HamburgerMenu from '../Navigation/Hamburger';
import HeroSlider from '../../assets/hero-slider.webp';
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../Navigation/Footer';
import Pagination from '../Navigation/Pagination';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axoisClient';

export default function AccountSettings() {

  const [loading,setLoading] = useState(false);
  const {user,setUser} = useStateContext();
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => setUser(data))
  }, []);

  const getOrders = (url) => {
    url = url || '/userOrder'
    setLoading(true)
    axiosClient.get(url)
    .then(({data}) => {
      console.log(data.data);
      setOrders(data.data);
      setLoading(false)
    });
  }
  useEffect(() => {
    getOrders()
  },[])


  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div>
      <div className='h-24'>
        <Header color={'black'} />
        <HamburgerMenu color={'black'} />
      </div>
      <div>
        <section className='hero-section'>
          <img src={HeroSlider} alt="" className='w-full h-72 object-cover' />
          <h1 className='text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center w-full fontBold'>
            Welcome, {user.name}
          </h1>
        </section>
        <section className="accountOptions bg-gray-200">
          <div className="container mx-auto px-4 py-8">
          <button className='text-2xl' onClick={handleGoBack}>
              &#8592;
            </button>
            <h2 className="text-3xl font-bold mb-4 fontBold">Order History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b fontBold">Item Amount</th>
                    <th className="py-2 px-4 border-b fontBold">Date</th>
                    <th className="py-2 px-4 border-b fontBold">Status</th>
                    <th className="py-2 px-4 border-b fontBold">Item Number</th>
                    <th className="py-2 px-4 border-b fontBold">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading && (<div className="flex justify-center items-center mt-10">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"></path>
                    </svg>
                    <span>Loading...</span>
                  </div>)
                  }
                  
                  {!loading && orders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-2 px-4 border-b text-center">{order.order.product_id.salePrice}</td>
                      <td className="py-2 px-4 border-b text-center">{order.date}</td>
                      <td className="py-2 px-4 border-b text-center">{order.orderStatus != null ? order.orderStatus : "Incomplete Transaction"}</td>
                      <td className="py-2 px-4 border-b text-center">{order.transaction != null ? order.transaction : "No ID"}</td>
                      <td className="py-2 px-4 border-b">{order.user.address1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='mt-10'>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
