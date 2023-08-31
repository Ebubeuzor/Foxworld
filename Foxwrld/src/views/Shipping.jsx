import React from 'react';
import HamburgerMenu from "../components/Navigation/Hamburger";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

export default function Shipping() {
  return (
    <div className="p-8">
    <Header color="black" />
    <HamburgerMenu color="black" />
    
    <section className="mb- mt-32">
      <h1 className="text-2xl font-bold mb-4">Shipping and Delivery</h1>
      
      <p>
          At Foxwrld, we take great care to ensure that your enchanting purchases reach you with the utmost care and efficiency. We offer worldwide shipping to bring the allure of our collections right to your doorstep. Below, you'll find all the essential information about our shipping method, delivery times, and any additional details to make your shopping journey seamless.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Standard Shipping</h2>
        
        <p>
          At Foxwrld, we aim to provide you with a delightful shopping experience that includes reliable and cost-effective shipping options. Our Standard Shipping option ensures that your enchanting purchases reach you in a timely and secure manner.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Estimated Delivery Time</h2>
        
        <ul className="list-disc list-inside ml-4">
          <li>7-14 business days</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Shipping Cost</h2>
        
        <p>
          Shipping fees may vary based on your location and order total. The exact cost will be displayed during checkout.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Order Processing Time</h2>
        
        <p>
          Your order will be prepared for dispatch within 1-3 business days after you complete your purchase.
        </p>
      </section>
      
      {/* ... (Rest of the content) */}
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">International Shipping</h2>
        
        <p>
          We are delighted to offer worldwide shipping to bring the allure of Foxwrld to customers across the globe. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.
        </p>
      </section>
      
      {/* ... (Rest of the content) */}
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Delays and Exceptions</h2>
        
        <p>
          While we make every effort to ensure timely delivery, occasional delays may occur due to factors beyond our control, such as customs clearance or unforeseen circumstances. Rest assured that we're actively working to expedite the process and ensure your order's safe arrival.
        </p>
      </section>
      
      {/* ... (Rest of the content) */}
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Delivery Address</h2>
        
        <p>
          To avoid any complications, please provide an accurate and complete delivery address during checkout. We won't be responsible for delays caused by incorrect address details.
        </p>
      </section>
      
      <section>
        <h2 className="text-xl font-bold my-4">Contact Us</h2>
        
        <p>
          For any inquiries regarding shipping, delivery, or any other assistance, our Customer Support team is here to help. Feel free to reach out to us at support@foxwrld.com or through our social media handles. We are dedicated to providing you with a seamless shopping experience from start to finish.
        </p>
      </section>
      
      <section>
        <p className="mt-8">
          With the Standard Shipping option, you can expect your enchanting pieces to be delivered to your doorstep within the estimated delivery time, allowing you to embark on your own magical journey with Foxwrld's timeless elegance.
        </p>
        
        <p className="mb-16">
          For any inquiries regarding shipping, delivery, or any other assistance, our Customer Support team is here to help. Feel free to reach out to us at support@foxwrld.com or through our social media handles. We are dedicated to providing you with a seamless shopping experience from start to finish.
        </p>
      </section>
      <Footer/>
    </div>

  );
}
