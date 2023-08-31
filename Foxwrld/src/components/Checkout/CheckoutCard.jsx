import React, { useEffect } from "react";
import sandals from "../../assets/sandals.jpeg";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";

export default function CheckoutCard({products}) {
  const {notification,setNotification,setIncart} = useStateContext();
  const deleteFromCart = (id) => {
    axiosClient.delete(`/order/${id}`)
    .then(()=>{
      setNotification("Product has been successfully removed from your database")
        axiosClient.get('/userCart')
        .then(({data}) => {
          setIncart(data.data)
          // console.log(data.data);
        }).catch((e) => {
          // console.log(e);
        })
    })
    .catch((e) =>
     console.log(e)
     )
  }
  
  // console.log(products);
  return (
    <>
      {products &&
        Object.values(products).map((product) =>(
          <div key={product.id}>
            <div className="itemContainer  flex md:p-5 border-t-2 w-full border-b-2 mx-4 py-8">
              <div className="w-40 h-40">
                <img src={product.product_id.frontImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-full pl-4">
                <h2 className="text-sm fontbold">{product.product_id.title}</h2>
                <div className="flex items-center mt-16 md:justify-between flex-wrap">
                  <p className="text-gray-600 mr-2 text-sm">Quantity: 1</p>
                  <span className="text-gray-400 text-sm">|</span>

                  <p className="text-gray-600 mr-2 text-sm">Size: {product.size}</p>
                  <span className="text-gray-400 text-sm">|</span>
                  <p className="ml-2 text-sm fontBold">₦{product.product_id.salePrice}</p>
                </div>
              </div>
              <div>
                <p onClick={() => deleteFromCart(product.id)} className="fontBold cursor-pointer">X</p>
              </div>
            </div>
          </div>
        ))
        }

        {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
        }
      </>
  );
}
