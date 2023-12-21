import React from 'react';
import { Link } from 'react-router-dom'; 

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">        <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>      
404 Not Found</h1>
        <p className="text-gray-600 text-sm">Sorry, the page you are looking for might be in another universe.</p>
          <button className="bg-black text-white p-4 mt-5">
         <Link to="/"> Go back to homepage</Link>
          </button>
      </div>
    </div>
  );
};

export default ErrorPage;
