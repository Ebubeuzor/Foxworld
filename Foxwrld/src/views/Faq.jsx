import React, { useState } from 'react';
import Header from '../components/Navigation/Header';
import HamburgerMenu from '../components/Navigation/Hamburger';
import Footer from '../components/Navigation/Footer';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'How do I place an order?',
      answer:
        "Placing an order at Foxwrld is simple. Just browse our collections, select your favorite pieces, add them to your cart, and proceed to checkout. Follow the instructions to provide shipping and payment details, and voilà!",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        "We accept credit/debit cards, to ensure a secure and convenient shopping experience.",
    },
    {
      question: 'Can I track my order?',
      answer:
        "While we currently do not offer a direct tracking feature on our website, rest assured that we'll keep you informed every step of the way. Once your order is confirmed, you'll receive regular updates via email regarding its status and estimated delivery time. If you have any concerns or need further assistance, just reach out, and we'll ensure you have a smooth and enchanting experience with Foxwrld.",
    },
    {
      question: 'What is your return policy?',
      answer:
        "At Foxwrld, we want you to love your purchase. If, for any reason, you're not entirely satisfied, we offer a hassle-free return policy within 7 days of receiving the product. Within this time frame, you can contact our Customer Support team via social media to request a refund or exchange. However, for returns requested after the 7-day window, we, unfortunately, won't be able to process a refund or exchange. So, we encourage you to review your order as soon as it arrives to ensure it meets your expectations within the eligible return timeframe. For more details, please refer to our Returns & Refunds Policy page on our website.",
    },
    {
      question: 'How do I find my size?',
      answer:
        "To find your perfect fit, refer to our Size Guide, which provides detailed measurements for each clothing item. If you need further assistance, our Customer Support team is here to help.",
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        "Yes, we ship worldwide. Just select your country during checkout, and we'll deliver your order to your desired destination.",
    },
    {
      question: 'How can I contact Customer Support?',
      answer:
        "Our dedicated Customer Support team can be reached via support@foxwrld.com or on any of our social media outlets. We aim to respond promptly to assist you.",
    },
    {
      question: 'Are your products ethically sourced?',
      answer:
        "Yes, at Foxwrld, we are committed to ethical practices. Our materials are sourced responsibly, and we collaborate with artisans who share our values.",
    },
    {
      question: 'Are there any discounts or promotions available?',
      answer:
        "Yes, we occasionally offer exclusive promotions and discounts to our valued customers. Stay tuned to our website and subscribe to our newsletter to be the first to know about our special offers.",
    },
    {
      question: 'How can I stay updated on new collections and releases?',
      answer:
        "To stay in the loop with the latest Foxwrld on our social media. Be the first to know about new collections, promotions, and fashion inspirations.",
    },
    {
      question: 'How long does it take to process and ship orders?',
      answer:
        "We pride ourselves on swift order processing. Once you place an order, our artisans work diligently to prepare it for dispatch within 3 business days. Shipping times vary based on your location and selected shipping method. You can find more details in our Shipping and Delivery section.",
    },
  ];

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div>
           <Header  color={"black"} />
        <HamburgerMenu color="black"  />
    <div className="max-w-2xl mx-auto p-4 ">
        
      <h1 className="text-2xl font-semibold mb-4 mt-32 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4 mb-16">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-lg">
            <button
              className="flex justify-between items-center p-4 w-full text-left"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold">{item.question}</span>
              <span className="text-gray-500">
                {activeIndex === index ? '-' : '+'}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}
