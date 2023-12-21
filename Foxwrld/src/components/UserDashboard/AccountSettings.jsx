import React, { useEffect, useRef, useState } from "react";
import Header from "../Navigation/Header";
import HamburgerMenu from "../Navigation/Hamburger";
import HeroSlider from "../../assets/hero-slider.webp";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Navigation/Footer";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axoisClient";

export default function AccountSettings() {
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
  const {user,setUser,notification,setNotification} = useStateContext();
  
  const [error, setError] = useState({__html: ""});

  const nameRef = useRef();
  const countryRef = useRef();
  const dobRef = useRef();

  const userData = () => {
    axiosClient.get('/user')
    .then(({data}) => setUser(data))
  }
  useEffect(() => {
    userData()
  }, []);

  const submitData = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      country: countryRef.current.value,
      date_of_birth :dobRef.current.value
    }

    // console.log(payload);

    axiosClient.put(`/user/${user.id}`, payload)
    .then(({data})=>{
      userData()
      setNotification("Your details has been updated")
      // console.log(data);
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

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div>
      <div className="h-24">
        <Header color={"black"} />
        <HamburgerMenu color={"black"} />
      </div>
      <div>
        <section className="hero-section">
          <img src={HeroSlider} alt="" className="w-full h-72 object-cover" />
          <h1 className="text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-center w-full fontBold">
            Welcome, {user.name}!
          </h1>
        </section>
        <section className="accountOptions bg-gray-200">
          <div className="container mx-auto px-4 py-20">
            <button className="text-2xl" onClick={handleGoBack}>
              &#8592;
            </button>
            <h2 className="fontBold  text-3xl mb-5">My Personal Details</h2>
            {
              error.__html && (
                  <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                  </div>
              )
            }
            <form className="grid grid-cols-2 md:grid-cols-2 gap-4" onSubmit={submitData}>
              <div className="col-span-2 md:col-span-3">
                <label
                  htmlFor="userName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  id="userName"
                  ref={nameRef}
                  className="border border-none rounded-md p-2 w-full"
                  
                />
              </div>
              <div className="col-span-2 md:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  defaultValue={user.country}
                  ref={countryRef}
                  className="border border-none rounded-md p-2 w-full"
                  
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  defaultValue={user.date_of_birth}
                  ref={dobRef}
                  className="border border-none rounded-md p-2 w-full"
                  
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
      </div>
      
      {
        notification && (
            <div className="w-[300px] py-2 px-3 text-white rounded bg-green-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
            {notification}
        </div>)
      }
      <Footer />
    </div>
  );
}
