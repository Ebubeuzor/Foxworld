import React, { useEffect, useState } from "react";
import Header from "../components/Navigation/Header";
import Hamburger from "../components/Navigation/Hamburger";
import MainPageSlider from "../components/MainPageSlider";
import TextualPictureFrame from "../components/TextualPictureFrame";
import InPageNav from "../components/InPageNav";
import Footer from "../components/Navigation/Footer";
import axiosClient from "../axoisClient";

export default function Homepage() {
  const [views, setViews] = useState(0);
  const [color] = useState("white");
  const [homepageData, setHomepageData] = useState("");
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [mainSliderImageLoaded, setMainSliderImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homepageResponse = await axiosClient.get("/homepage");
        const viewCountResponse = await axiosClient.get("/view-count");

        // Set homepage data
        homepageResponse.data.data.forEach((d) => setHomepageData(d));

        // Set view count
        setViews(viewCountResponse.data.views - 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when both requests are completed
      }
    };

    fetchData();
  }, []);

  // Function to handle Main Slider image load
  const handleMainSliderImageLoad = () => {
    setMainSliderImageLoaded(true);
  };

  return (
    <div>
      {loading ? (
        <div className="mt-2 text-gray-500 h-screen fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-50 bg-white">
          <div className="containerss"></div>
        </div>
      ) : (
        <div>
          <Header color={"white"} />
          <Hamburger color={color} />

          <MainPageSlider
            image={homepageData.homeImage}
            onImageLoad={handleMainSliderImageLoad}
            loaded={mainSliderImageLoaded}
          />

          <div>
            <TextualPictureFrame img={homepageData.Section1Image} title={homepageData.Section1Title} />
          </div>
          <InPageNav />
        </div>
      )}

      <div className="flex justify-center flex-wrap">
        <div className="flex-grow ">
          <TextualPictureFrame img={homepageData.Section2aImage} title={homepageData.Section2aCategory} />
        </div>
        <div className="flex-grow ">
          <TextualPictureFrame img={homepageData.Section2bImage} title={homepageData.Section2bCategory} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
