import React from 'react';
import HamburgerMenu from "../components/Navigation/Hamburger";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";

export default function Privacy() {
  return (
    <div className="p-8">
            <Header  color={"black"} />
        <HamburgerMenu color="black"  />
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-4 mt-32">Privacy Policy</h1>
        
        <p>
          At Foxwrld, we respect your privacy and value the trust you place in us. This Privacy Policy outlines how we collect, use, store, and protect your personal information. By accessing our website or using our services, you agree to the practices described in this policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Information We Collect</h2>
        
        <p>
          We may collect the following types of personal information from you:
        </p>
        
        <ol className="list-decimal list-inside ml-4">
          <li>Name: To personalize your shopping experience and address you properly.</li>
          <li>Email Address: To provide order updates, shipping notifications, and customer support communication.</li>
          <li>Address: To facilitate order processing and ensure timely delivery.</li>
          <li>Phone Number: To contact you in case of any order-related issues and for enhanced customer support.</li>
        </ol>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Purpose of Data Collection</h2>
        
        <p>
          We collect your personal information solely for the following purposes:
        </p>
        
        <ol className="list-decimal list-inside ml-4">
          <li>Order Processing: To process your orders, arrange for shipping, and deliver your enchanting purchases to your doorstep.</li>
          <li>Customer Support: To assist you with any inquiries, address concerns, and provide exceptional support.</li>
          <li>Payment Processing: We may share your payment information securely with reputable third-party payment processors to process your transactions securely.</li>
        </ol>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Third-Party Services</h2>
        
        <p>
          We engage with reputable third-party services, including payment processors and shipping partners, to enhance your shopping experience. Please note that these third parties may also collect and process your personal information in accordance with their respective privacy policies.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Data Storage and Security</h2>
        
        <p>
          Your personal information is securely stored and protected by reasonable technical and organizational measures to prevent unauthorized access, disclosure, alteration, or destruction.
        </p>
      </section>
      
      <section>
        <h2 className="text-xl font-bold my-4">Data Retention</h2>
        
        <p>
          We retain your personal information for up to 8 days after you receive your order. After this period, we securely dispose of the information. However, for registered users, we retain certain details, such as addresses, to facilitate seamless future orders.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Cookies and Tracking Technologies</h2>
        
        <p>
          To provide you with a smooth and personalized experience, we use cookies and tracking technologies. These technologies allow us to understand your preferences and improve our services. By using our website, you consent to the use of cookies in accordance with this policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">User Accounts</h2>
        
        <p>
          When you create an account on our website, we collect your name, email address, and phone number for enhanced personalization and future order convenience.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Marketing Communication</h2>
        
        <p>
          At present, we don't engage in marketing communication. Rest assured, should we do so in the future, we will always provide you with an option to opt-out if you prefer not to receive such communications.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Children's Privacy</h2>
        
        <p>
          We do not knowingly collect personal information from individuals under the age of 16. If you are under 16, please refrain from using our website or providing any personal information.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Data Sharing</h2>
        
        <p>
          We do not share your personal information with any third parties, except for the purposes mentioned in this Privacy Policy.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold my-4">Updates to Privacy Policy</h2>
        
        <p>
          We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting on this page.
        </p>
        
        <p>
          For any questions or concerns regarding your privacy or this policy, please contact our Customer Support team at privacy@foxwrld.com.
        </p>
      </section>
      
  

 

      
      <section>
        <p className="mt-8 mb-16">
          By shopping with Foxwrld, you affirm your understanding and agreement to this Privacy Policy. We are committed to providing you with an enchanting experience, always with your privacy and security in mind.
        </p>
      </section>
      <Footer/>
    </div>
  );
}
