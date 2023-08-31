import React from "react";

export default function Button(props) {
  return (
    <div>
      <button
        type="submit"
        className=" text-black border-2 border-black rounded-lg hover:bg-black hover:text-white px-4 py-2 mt-4 block"
      >
        {props.text}
      </button>
    </div>
  );
}
