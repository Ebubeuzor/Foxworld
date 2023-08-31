import React from 'react';
import HamburgerMenu from "../components/Navigation/Hamburger";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

export default function Return() {
  return (
    <div className="p-8">
            <Header  color={"black"} />
        <HamburgerMenu color="black"  />
      <section className="mb-8 mt-32">
        <h1 className="text-2xl font-bold mb-4">Return and Refund Policy</h1>
        
        <p>
          At Foxwrld, we are committed to ensuring your satisfaction with every enchanting purchase. To provide you with the utmost convenience and transparency, we have curated a detailed Return and Refund Policy. Please read the following guidelines carefully to understand the process for initiating a return and obtaining a refund.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Return Period</h2>
        
        <ul className="list-disc list-inside ml-4">
          <li>You have 7 days from the date of receiving your order to initiate a return.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Eligibility for Return</h2>
        
        <ul className="list-disc list-inside ml-4">
          <li>To be eligible for a return, the item(s) must be unworn, in their original packaging, and with all tags securely attached, ensuring the items are in the same pristine condition as when you received them.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Non-Returnable Items</h2>
        
        <p>
          For hygiene and safety reasons, we regretfully cannot accept returns on undergarments, underwear, bras, and socks. Please ensure you consider this when making your purchase.
        </p>
      </section>
      
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Refund Method</h2>
        
        <p>
          Once your return is approved, we will process the refund through the original payment method used during your purchase. Expect the refund to be reflected in your account within 4-14 business days, depending on your payment provider.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Initiating a Return</h2>
        
        <ol className="list-decimal list-inside ml-4">
          <li>Send an email to our Customer Support team at returns@foxwrld.com.</li>
          <li>In your email, provide your order receipt, order number, and a detailed explanation as to why you require a refund.</li>
          <li>Attach at least 5 clear pictures showcasing the condition of the item(s) you wish to return.</li>
          <li>Record a video, lasting no longer than 1 minute, explaining the situation and demonstrating the condition of the item(s).</li>
          <li>We kindly request that you include these media files as they help us better understand your situation and expedite the return process.</li>
        </ol>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Exchanges</h2>
        
        <p>
          We understand that occasionally, sizing or color preferences may differ. As such, we offer exchanges for items of the same value, subject to availability.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Conditions for Exchanges</h2>
        
        <p>
          The same conditions applicable to returns also apply to exchanges. The items must be unworn, with tags attached, in their original packaging, and you must initiate the exchange within 7 days of receiving your order.
        </p>
      </section>
      
      <section>
        <p className="mt-8 mb-16">
          If you have any questions or require further assistance regarding our Return and Refund Policy, please don't hesitate to reach out to our dedicated Customer Support team. We are always here to ensure your shopping experience remains enchanting and seamless from start to finish.
        </p>
      </section>
      <Footer/>
    </div>
  );
}
