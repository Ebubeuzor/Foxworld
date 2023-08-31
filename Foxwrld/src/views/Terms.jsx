import React from 'react';
import HamburgerMenu from "../components/Navigation/Hamburger";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

export default function Terms() {
  return (
    <div className="p-8">
      <Header color="black" />
      <HamburgerMenu color="black" />
      
      <section className="mb-8 mt-32">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <section className="mb-4">
          <h2 className="text-xl font-bold">1. Age Requirement</h2>
          <p>
            To place an order with Foxwrld, you must be at least 16 years old or above.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-xl font-bold">2. Product Information</h2>
          <p>
            All relevant information, including product descriptions, pricing, and availability, will be readily available on our website and social media platforms. We strive for accuracy and transparency to enhance your shopping experience.
          </p>
        </section>
        
        <section className="mb-4">
          <h2 className="text-xl font-bold">3. Order Acceptance</h2>
          <p>
            Foxwrld reserves the right to decline or cancel an order under specific circumstances, such as payment not being approved, suspicion of fraudulent activity, or identification of fake credit alerts.
          </p>
        </section>
        
        <section className="mb-4">
  <h2 className="text-xl font-bold">4. Currency</h2>
  <p>
    The currency for all transactions on our website will be Nigerian Naira (NGN) and American Dollar (USD).
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">5. Shipping and Delivery</h2>
  <p>
    Shipping times will vary, and delivery is expected to take at least 7 business days, with potential variations depending on your location. We ensure that your enchanting purchases will be delivered to the exact address you provide during checkout, so please ensure accurate address details to expedite the delivery process.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">6. Returns and Refunds</h2>
  <p>
    For detailed information about returns and refunds, please refer to our dedicated Refund and Return Policy, available on our website. Generally, you may initiate a return within 7 days of receiving the product. The policy outlines the eligibility criteria and the process for requesting a refund.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">7. Legal Protection</h2>
  <p>
    Your rights and interests are protected by relevant laws and regulations. We uphold these laws and respect your privacy and security.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">8. User Accounts</h2>
  <p>
    To enjoy personalized features and seamless order processing, users are required to create an account on our website. Account activation involves confirmation via email. Please ensure that all orders are made through your registered account.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">9. Customer Satisfaction</h2>
  <p>
    At Foxwrld, your satisfaction is of paramount importance to us. We are dedicated to providing you with an enchanting shopping experience, exceptional customer support, and top-quality products.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">10. Enchanting Designs</h2>
  <p>
    Our captivating designs are curated with meticulous attention to detail, embodying the elegance and allure that define Foxwrld.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">11. Continuous Improvement</h2>
  <p>
    We are committed to constant improvement and growth. We regularly update our website, policies, and services to offer you the best shopping experience.
  </p>
</section>

<section className="mb-4">
  <h2 className="text-xl font-bold">12. Fraudulent Activity</h2>
  <p>
    Foxwrld reserves the right to take appropriate action against any fraudulent activity, including notifying the relevant authorities when necessary.
  </p>
</section>
        
        <section className="mb-4">
          <h2 className="text-xl font-bold">13. Enchantment at its Best</h2>
          <p>
            Our mission is to inspire enchantment through fashion, bringing forth a world of timeless elegance and sophistication.
          </p>
        </section>
        
      </section>
      
      {/* ... (Previous sections) */}
      
      <section>
        <p className="mt-8 mb-16">
          By proceeding with your purchase on Foxwrld, you acknowledge and agree to abide by these Terms and Conditions. We are delighted to have you as a part of our enchanting community, and we promise to keep captivating you with our alluring designs and exceptional service.
        </p>
      </section>
      
      <Footer />
    </div>
  );
}
