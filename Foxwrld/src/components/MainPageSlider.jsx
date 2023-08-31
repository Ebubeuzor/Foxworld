import React, { useEffect, useRef, useState } from "react";
import video1 from "../assets/videos/video2.mp4";

const MainPageSlider = (props) => {
  

  return (
    <div className="main relative">
      <div className="overlay absolute inset-0 bg-black opacity-50"></div>{" "}
      <video
        className="video-bg object-cover h-[100vh] min-w-full"
        autoPlay
        muted
        loop
        playsInline 
        src={props.video} type="video/mp4" />
        
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center  text-white">
        <h1>Welcome to</h1>
        <p className="text-4xl font-extrabold font-sans">FOXWRLD</p>
      </div>
    </div>
  );
}

export default MainPageSlider