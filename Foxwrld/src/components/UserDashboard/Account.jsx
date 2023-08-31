import React, { useEffect } from "react";
import Header from "../Navigation/Header";
import HamburgerMenu from "../Navigation/Hamburger";
import HeroSlider from "../../assets/hero-slider.webp";
import { Link } from "react-router-dom";
import Footer from "../Navigation/Footer";
import axiosClient from "../../axoisClient";
import { useStateContext } from "../../context/ContextProvider";

export default function Account() {
  
  const {user,setUser} = useStateContext();
  
  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => setUser(data))
  }, []);

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
          <div className="my-account-options flex  mt-7 mx-4 text-center flex-wrap justify-center">
            <Link to="/AccountOrder" className="m-6">
              <div>
                <div className="link-my-account-options">
                  <span className="fontBold">My Orders</span>
                </div>
                <div className="description-my-account-option">
                  Manage and edit your orders
                </div>
              </div>
            </Link>

            <Link to="/AccountSettings" className="m-6">
              <div>
                <div className="link-my-account-options">
                  <span className="fontBold">Account Settings</span>
                </div>
                <div className="description-my-account-option">
                  Manage profile and preferences.
                </div>
              </div>
            </Link>

            <Link to="/AccountAddress" className="m-6">
              <div>
                <div className="link-my-account-options">
                  <span className="fontBold">Address Book</span>
                </div>
                <div className="description-my-account-option">
                  Manage shipping & billing addresses.
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
