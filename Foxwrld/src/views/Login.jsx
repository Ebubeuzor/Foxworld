import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Navigation/Header";
import Hamburger from "../components/Navigation/Hamburger";
import googleLogo from "../assets/googleLogo.png";
import appleLogo from "../assets/appleLogo.png";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axoisClient";

export default function Login() {
  const {token,setToken,setUser} = useStateContext();
  const [loginUrl, setLoginUrl] = useState(null);

  if(token){
    return <Navigate to={"/"}/>
  }

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState({__html: ""});

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login',payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
      location.reload();
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

  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/auth', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong!');
    })
    .then((data) => setLoginUrl( data.url ))
    .catch((error) => console.error(error));
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Hamburger color="black" />
      <div className="flex flex-col items-center justify-center flex-grow mt-14">
        <h2 className="text-2xl font-bold mb-4 fontBold">Login</h2>
        <form className="w-64" method="post" onSubmit={onSubmit}>
          
          {
            error.__html && (
                <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>

                </div>
            )
          } 

          <label htmlFor="email" className="mb-2 block fontBold">
            Email:
          </label>
          <input
            type="email"
            ref={emailRef}
            id="email"
            className="border border-gray-300 rounded px-2 py-3 mb-4 w-full"
          />

          <label htmlFor="password" className="mb-2 block fontBold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="border border-gray-300 rounded px-2 py-3 mb-4 w-full"
          />

          <div className="flex flex-col justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-black-700 text-white rounded px-4 py-2 uppercase"
            >
              SIGNIN
            </button>

            </div>
        </form>
            
          {loginUrl != null && (
            <button type="button" className="flex justify-center border-2 border-black my-4 py-2 px-3 items-center">
              <span>
                <img src={googleLogo} className="w-6 " alt="" />
              </span>
              &nbsp;
              <span className="uppercase text-sm fontBold">
                <a href={loginUrl}> continue with google</a>
              </span>
            </button>
          )}
            <Link
              to="/Forgot"
              className="text-black hover:text-blue-700 block fontBold"
            >
              Forgot Password?
            </Link>
            <p className="text-sm  mt-4 fontBold">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-700 hover:text-blue-900 fontBold"
              >
                Signup
              </Link>
            </p>
      </div>
    </div>
  );
}
