import React, {useState} from 'react';
import Header from '../Navigation/Header';
import Hamburger from '../Navigation/Hamburger';
import pjamas1 from '../../assets/pjamas1.jpeg';
import pjamas2 from '../../assets/pjamas2.jpeg';
import jacket1 from '../../assets/jacket1.jpeg';

export default function ProductCardDetails() {
    const glasses = {
        name: 'Example Glasses',
        colorOptions: ['Black', 'Brown', 'Silver'],
        images: [
            pjamas1,
            pjamas2,
            jacket1,
        ],
       
      };

  const [selectedColor, setSelectedColor] = useState(glasses.colorOptions[0]);
  const [currentImageIndex, setCurrentImageIndex] =useState(0);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? glasses.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === glasses.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
  

      <div>
      <Header />
      <Hamburger />

        <div>
          <div>
            <iframe
              src={glasses.threeDImageUrl}
              width="100%"
              height="400px"
              title="3D Image"
            />
          </div>

          <div>
            <button onClick={handlePrevious}>Previous</button>
            <img
              src={glasses.images[currentImageIndex]}
              alt="Glasses"
              width="400px"
              height="300px"
            />
            <button onClick={handleNext}>Next</button>
          </div>
        </div>

        <div>
          <h3>Color Options</h3>
          <div>
            {glasses.colorOptions.map((color, index) => (
              <button
                key={index}
                style={{ background: color, marginRight: '10px' }}
                onClick={() => handleColorChange(color)}
              >
                {selectedColor === color && '✔ '}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Details</h3>
          <p>Color: {selectedColor}</p>
          <p>Price: ${glasses.price}</p>
          <p>Brand: {glasses.brand}</p>
        </div>
      </div>
    </div>
  );
}
