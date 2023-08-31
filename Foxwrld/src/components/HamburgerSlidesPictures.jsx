import React from "react";

export default function HamburgerSlidesPictures(props) {
  return (
    <div>
      <div className="w-fit  text-center">
        <img src={props.img} alt="women" className="object-cover  h-[200px]" />
        <div>{props.text}</div>
      </div>
    </div>
  );
}
