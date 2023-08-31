import React, { useEffect } from "react";
import Header from "../components/Navigation/Header";
import Hamburger from "../components/Navigation/Hamburger";
import googleLogo from "../assets/googleLogo.png";
import appleLogo from "../assets/appleLogo.png";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Login");
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      {/* <Header color="black" /> */}
      {/* <Hamburger color="black" /> */}
      <div className="flex flex-col items-center justify-center flex-grow mt-14">
        <h2 className="text-2xl font-bold mb-4 fontBold">A Password Reset Link has been sent to you </h2>
        <p className="text-xl font-bold mb-4 fontBold">pls check your email address </p>

      </div>
    </div>
  );
}
