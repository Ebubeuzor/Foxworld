import React from "react";

export default function Pagination({ meta, onPageClick }) {
  function onClick(ev, link) {
    ev.preventDefault();
    if (!link.url) {
      return;
    }

    onPageClick(link);
  }

  return (
    <div className="flex flex-col items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
      <div className="flex justify-between w-full">
        <a
          href="#"
          onClick={(ev) => onClick(ev, meta.links[0])}
          className="pagination-button bg-slate-300 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </a>
        <span className="pagination-info bg-gray-200 text-gray-700 py-2 px-4">
          Page {meta.current_page} of {meta.last_page}
        </span>
        <a
          href="#"
          onClick={(ev) => onClick(ev, meta.links[meta.links.length - 1])}
          className="pagination-button bg-slate-600 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-r cursor-pointer"
        >
          Next
        </a>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{meta.from}</span> to{" "}
          <span className="font-medium">{meta.to}</span> of{" "}
          <span className="font-medium">{meta.total}</span> results
        </p>
      </div>
    </div>
  );
}
