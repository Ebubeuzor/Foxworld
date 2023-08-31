import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div >
    
      <div className=" py-10 absolute left-0 right-0  border-t-2 mt-2" >
        <div className="flex mx-20 flex-wrap ">
          <section className="  flex-grow m-3">
            <div className="">
              <h3 className="text-[12px] uppercase fontbold ">Shop By Category
</h3>
              <ul>
                <li>
                  <Link className="text-[11px] fontThin ">New In
</Link>
                </li>
                <li>
                  <Link className="text-[11px] fontThin ">Men</Link>
                </li>
                <li>
                  <Link className="text-[11px] fontThin ">Women</Link>
                </li>
                <li>
                  <Link className="text-[11px] fontThin ">Children</Link>
                </li>
              </ul>
            </div>
          </section>
          <section className="footer-block m-3 flex-grow">
            <div className="footer-sect">
              <h3 className="text-[12px] uppercase fontbold ">Help Center</h3>
              <ul>
                <li>
                 <Link to="/faq" className="text-[11px] fontThin ">Frequently Asked Questions (FAQ)
</Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-[11px] fontThin ">Shipping and Delivery
</Link>
                </li>
                <li>
                 <Link to="/return" className="text-[11px] fontThin ">Return and Refund Policy
</Link>
                </li>
                <li>
                 <Link to="/privacy" className="text-[11px] fontThin ">Privacy Policy

</Link>
                </li>
                <li>
                 <Link to="/terms" className="text-[11px] fontThin ">Terms and Conditions

</Link>
                </li>
              </ul>
            </div>
          </section>
          <section className="footer-block m-3 flex-grow-2">
            <div className="footer-sect">
              <h3 className="text-[12px] uppercase fontbold ">Contact</h3>
              <ul>
                <li>
                  <Link className="text-[11px] fontThin "><strong className="block">Email:</strong> info@foxwrld@gmail.com</Link>
                </li>
              
                <li>
                  <Link className="text-[11px] fontThin "><strong className="block">Telephone </strong>
                  +2349068722889</Link>
                </li>
                <li>
                  <Link className="text-[11px] fontThin "><strong className="block">Address </strong>
                  123 Busco Street, Lagos.</Link>
                </li>
                <li>
                  <Link className="text-[11px] fontThin "><strong className="block">Business Hours </strong>
                  Monday to Sunday: 8:00 AM - 8:00 PM
</Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className="mx-20  flex mt-11 pt-10 flex-wrap ">
          <div className="m-3 justify-center">
         <p className="text-sm"> Copyright © 2023 FOXWRLD.COM</p>
          </div>
         
        </div>
      </div>
      
    </div>
  );
}
