import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function InPageNav() {
  
  const [female] = useState("female");
  const [male] = useState("male");
  const [children] = useState("children");

  return (
    <div className="leading-10  py-14">
      <div className="text-center">
        <div className="">
          <Link to="#" className="text-[14px] fontbold">
            New Arrivials
          </Link>
        </div>
        <div>
          <Link to={"/NewArrivals/"+male} className="text-[25px] fontThin hover:text-slate-700">
            Men
          </Link>
        </div>
        <div>
          <Link to={"/NewArrivals/"+female} className="text-[25px] fontThin hover:text-slate-700">
            Women
          </Link>
        </div>
        <div>
          <Link to={"/NewArrivals/"+children} className="text-[25px] fontThin hover:text-slate-700">
            Children
          </Link>
        </div>
      </div>
    </div>
  );
}
