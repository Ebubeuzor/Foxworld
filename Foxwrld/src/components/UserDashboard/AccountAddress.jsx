import React, { useEffect, useRef, useState } from "react";
import Header from "../Navigation/Header";
import HamburgerMenu from "../Navigation/Hamburger";
import HeroSlider from "../../assets/hero-slider.webp";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Navigation/Footer";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axoisClient";


export default function Account() {
  const [showModal, setShowModal] = useState(false);

  const [loading,setLoading] = useState(false);
  const {user,setUser,notification,setNotification} = useStateContext();
  
  const [error, setError] = useState({__html: ""});

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const name = useRef();
  const state = useRef();
  const city = useRef();
  const address1 = useRef();
  const address2 = useRef();
  const phoneno = useRef();
  const zipcode = useRef();

  const navigate = useNavigate();

  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => setUser(data))
  }

  useEffect(() => {
    userData()
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };
  
  const submitData = (ev) => {
    ev.preventDefault();
    const payload = {
      name: name.current.value,
      state: state.current.value,
      city: city.current.value,
      address1: address1.current.value,
      address2: address2.current.value,
      phoneno: phoneno.current.value,
      zipcode: zipcode.current.value,
    }

    console.log(payload);

    axiosClient.put(`/useraddress/${user.id}`, payload)
    .then(({data})=>{
      userData()
      setNotification("Your details has been updated")
      console.log(data);
    })
    .catch((error) => {
      
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors) {

          const finalError = Object.values(error.response.data.errors).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("<br/>")});
          
        } else {
          const finalError = Object.values(error.response.data.message).reduce((accum,next) => [
            ...accum, ...next
          ], [])
          setError({__html: finalError.join("")});
        }
      }

    })
  }

  return (
    <div>
      <div className="h-24">
        <Header color={"black"} />
        <HamburgerMenu color={"black"} />
      </div>
      <div>
        <section className="hero-section">
          <img src={HeroSlider} alt="" className="w-full h-72 object-cover" />
          <h1 className="text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center w-full">
            Welcome, {user.name}!
          </h1>
        </section>
        <section className="accountOptions">
          <div className="container mx-auto px-4 py-20  w-full">
            <button className="text-2xl" onClick={handleGoBack}>
              &#8592;
            </button>
            <h2 className="fontBold text-3xl mb-5">Address Book</h2>
            {
              error.__html && (
                  <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                  </div>
              )
            }
            <form className="grid grid-cols-2 gap-4" method="post" onSubmit={submitData}>
              <div>
                <label
                  htmlFor="UserName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  UserName
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  ref={name}
                  id="UserName"
                  className="border  rounded-md p-2 w-full"
                
                />
              </div>
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  defaultValue={user.address1}
                  ref={address1}
                  className="border  rounded-md p-2 w-full"
                
                />
              </div>
              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  defaultValue={user.address2}
                  ref={address2}
                  className="border  rounded-md p-2 w-full"
                
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-bold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  defaultValue={user.city}
                  ref={city}
                  className=" border rounded-md p-2 w-full"
                
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 font-bold mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  defaultValue={user.state}
                  ref={state}
                  className=" border rounded-md p-2 w-full"
                
                />
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  defaultValue={user.zipcode}
                  ref={zipcode}
                  className=" border rounded-md p-2 w-full"
                
                />
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  defaultValue={user.phoneno}
                  ref={phoneno}
                  className=" border rounded-md p-2 w-full"
                
                />
              </div>

              <div className="col-span-1 md:col-span-3">
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 px-4 w-full"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
        {
          notification && (
              <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
              {notification}
          </div>)
        }
        <div>
          {/* <button className="bg-black text-white p-4 m-4" onClick={toggleModal}>
            Add New Address
          </button> */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white h-full w-full p-4 rounded shadow">
                <div className="flex justify-end">
                  <button className="text-gray-500" onClick={toggleModal}>
                    X
                  </button>
                </div>
                <h2 className="text-lg font-bold mb-4">Modal Content</h2>
                <form className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="border  rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="border  rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="addressLine1"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      className="border  rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="addressLine2"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      className="border  rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className=" border rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className=" border rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      className=" border rounded-md p-2 w-full"
                    
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      className=" border rounded-md p-2 w-full"
                    
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
