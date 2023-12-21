// ImageModal.js

import React from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <img src={imageUrl} alt="Large Image" className="w-64 h-84" />
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-gray-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
