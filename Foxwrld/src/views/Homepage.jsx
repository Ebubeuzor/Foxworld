import React, { useEffect, useState } from "react";
import Header from "../components/Navigation/Header";
import Hamburger from "../components/Navigation/Hamburger";
import MainPageSlider from "../components/MainPageSlider";
import TextualPictureFrame from "../components/TextualPictureFrame";
import InPageNav from "../components/InPageNav";
import bag from '../assets/givenchy.jpeg';
import sandals from '../assets/sandals.jpeg';
import coats from '../assets/jacket.jpeg';
import Footer from "../components/Navigation/Footer";
import axiosClient from "../axoisClient";

export default function Homepage() {
  
  const [views, setViews] = useState(0);
  const color = "white";
  const [homepageData, setHomepageData] = useState("");

  useEffect(() => {
    axiosClient.get('/homepage')
    .then(({data}) => {
      data.data.map((d) => (
        setHomepageData(d)
      ))

    })
  }, []);

  useEffect(() =>{
    axiosClient.get('/view-count')
    .then(({data}) => {
      setViews((data.views) - 1)
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div>
      <div>
        <Header  color={"white"} />
        <Hamburger color={color} />

        <MainPageSlider  video={homepageData.homevideo}/>

       <div>
         <TextualPictureFrame img={homepageData.Section1Image} title={homepageData.Section1Title} />
       </div>
        <InPageNav/>
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="flex-grow ">
          <TextualPictureFrame img={homepageData.Section2aImage} title={homepageData.Section2aCategory} />
        </div>
        <div className="flex-grow ">
          <TextualPictureFrame img={homepageData.Section2bImage} title={homepageData.Section2bCategory} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
