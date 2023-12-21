import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import coats from "../../assets/coats.jpeg";
import Button from "../Button";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";
import ImageModal from "../ImageModal";

export default function Layout() {
  const [loading,setLoading] = useState(false);
  const {notification,setNotification,token,setToken,setUser,user} = useStateContext();
  const [status, setStatus] = useState("Processing");
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {id} = useParams();

  
  if(!token){
    return <Navigate to="/Login"/>
  }

  
  if (user.admin == null) {
    return <Navigate to="/"/>
  }
  
  const logOut = (ev) => {
    ev.preventDefault();
    
    axiosClient.get('/logout')
    .then((res) =>{
      setUser({});
      setToken(null);
      location.reload();
    });
  }

  useEffect(() => {
    setLoading(true)
    axiosClient.get(`/mainorder/${id}`)
    .then(({data}) => {
      console.log(data.data);
      setData(data.data);
      setLoading(false);
    })
    .catch((e) => console.log(e))
  },[])
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleScheduleClick = () => {
    setShowSchedule(!showSchedule);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }
  };

  
  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }

  useEffect(() => {
    userData()
  }, []);

  const updateStuff = (ev) => {
    ev.preventDefault();

    const data = {
      orderStatus: status
    }
    axiosClient.put(`/mainorder/${id}`, data)
    .then(({data}) => {
      setNotification("This data has been updated");
      <Navigate to={"/Order"} />
    })
    .catch((e) => console.log(e))
  }

  const deleteOrder = (ev) => {
    ev.preventDefault();

    axiosClient.delete(`/mainorder/${id}`)
    .then(({data}) => {
      setNotification("This order has been deleted");
    })
    .catch((e) => console.log(e))
  }

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    const checkboxes = document.querySelectorAll(
      'tbody input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };


  return (
    <div className="flex">
      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh]">
        <ul className="px-4">
          <li>
            <div className="fontBold">Welcome Admin</div>
          </li>
          <li>
            <div className="p-4 hover:bg-slate-300 border-b">
              <Link to="/EditHomepage" className="text-black  ">
                <div>EditHomepage</div>
              </Link>
            </div>
            <div className="p-4 hover:bg-slate-300 border-b">
              <Link to="/MenuEditor" className="text-black  ">
                <div>MenuEditor</div>
              </Link>
            </div>
            <div className="p-4 hover:bg-slate-300 border-b  ">
              <Link to="/Reports" className="text-black  ">
                <div>Analysis</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  bg-slate-400 border-b">
              <Link to="/EditOrder" className="text-black active">
                <div>Edit Order</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/Products" className="text-black ">
                <div>Products</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/NewProducts" className="text-black ">
                <div>New Products</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link to="/Order" className="text-black ">
                <div>Order</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="p-4  hover:bg-slate-300 border-b">
              <Link onClick={logOut}
              className="text-black ">
                <div>Logout</div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="main-content flex-1 bg-white h-[100vh] overflow-scroll p-4">
        <header>
          <div className="flex my-4 items-center">
            <h1 className="fontBold text-lg block">Edit Order</h1>

          </div>
            <p className="fontThin">Modify and update order details as needed to ensure accurate and timely processing.</p>
        </header>
        {
          loading && (<div className="flex justify-center items-center mt-10">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 010 10v3a8 8 0 000 16 4 4 0 110-8 4 4 0 004-4v-3a5 5 0 010-10v-3z"></path>
          </svg>
          <span>Loading...</span>
        </div>)
        }
        
        {!loading && <div className="bg-slate-200 rounded-lg shadow-lg p-4">
          <div className="  p-4 bg-white rounded shadow">
            <h1 className="text-2xl fontBold uppercase mb-4">
              Order Label <span>#{data && data.transaction}</span>
            </h1>
            <div className="uppercase ">
              <p className="fontBold mb-4">
                <Link className="underline fontBold">{data && data.user.name}</Link> Paid  {data && data.date}
              </p>
            </div>

            <div className="flex justify-between mb-4">
              <div>
                <h2 className="fontBold">General</h2>
                <h4>Date created</h4>
                <span>{data && data.date}</span>
              </div>
              <div>
                <h2 className="fontBold">Country</h2>

                <span>{data && data.user.country}</span>
              </div>
              <div>
                <h2 className="fontBold">State</h2>

                <span>{data && data.user.state}</span>
              </div>
              <div>
                <h2 className="fontBold">city</h2>

                <span>{data && data.user.city}</span>
              </div>
              <div>
                <h2 className="fontBold">Address</h2>
                {data && data.user.address1}
              </div>
              <div>
                <h2 className="fontBold">Address2</h2>
                {data && data.user.address2}
              </div>
            </div>

            <div className="mb-4">
              <strong className="fontBold">Status:</strong>
              <form onSubmit={updateStuff}>
                <select
                  defaultValue={data && data.orderStatus}
                  onChange={handleStatusChange}
                  className="block mt-1 w-full rounded-md border-gray-300 border focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-4"
                >
                  <option> Status</option>
                  <option>processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>On Hold</option>
                  <option>Refunded</option>
                  <option>Out for Delivery</option>
                  <option>Pending Payment</option>

                </select>
                <Button text="Update Status" />
              </form>
              
            </div>
            <div className="mb-2">
              <strong className="fontBold">Customer:</strong>
              <div>{data && data.user.name}</div>
            </div>

            <div className="mb-2">
              <strong className="fontBold">Phone no:</strong>
              <div>{data && data.user.phoneno}</div>
            </div>
            <div className="mb-2">
              <strong className="fontBold">Email:</strong>
              <div className="">{data && data.user.email}</div>
            </div>
            <div className="mb-2">
              <strong className="fontBold">Size:</strong>
              <div className="">{data && data.order.size}</div>
            </div>

            <div className="mb-2">
              <strong className="fontBold">Color:</strong>
              <div className="">{data && data.order.color_id.color}</div>
            </div>
          </div>

          
          <table className="w-full border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="fontBold bg-slate-500 p-2 uppercase text-white">Image</th>
                <th className="fontBold bg-slate-500 p-2 uppercase text-white">Name</th>
                <th className="fontBold bg-slate-500 p-2 uppercase text-white">Cost</th>

                <th className="fontBold bg-slate-500 p-2 uppercase text-white">Qty</th>
                <th className="fontBold bg-slate-500 p-2 uppercase text-white">Total</th>
              </tr>
            </thead>
            <tbody className="p-5 ">
              <tr className="p-5">
                <td className="text-center">
              {/* Add onClick to open the modal */}
              <img
                src={data && data.order.product_id.frontImage}
                alt="Product"
                className="w-16 h-16 mx-auto my-3 cursor-pointer"
                onClick={() =>
                  openModal(data && data.order.product_id.frontImage)
                }
              />
            </td>

                <td className="text-center">
                  <Link to="/">{data && data.order.product_id.title}</Link>
                </td>
                <td className="text-center">{data && data.order.product_id.salePrice}</td>

                <td className="text-center">1</td>
                <td className="text-center">{data && data.order.product_id.salePrice}</td>
              </tr>
            </tbody>
          </table>
        </div>}
      </div>

      <div className="sidebar bg-gray-200 w-1/4 border border-gray-300 h-[100vh] overflow-scroll">
        <div>
          <div className="border-b border-gray-300 p-4 fontBold">
            <h2 className=" py-4 fontBold text-2xl">Order Actions</h2>
            <p></p>
          </div>
       <div className="m-4">
        <button 
          onClick={deleteOrder} 
          className=" text-black border-2 border-black rounded-lg hover:bg-black hover:text-white px-4 py-2 mt-4 block"
        > Move to Trash </button>
       </div>
        </div>
      </div>
      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
       {showModal && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}
