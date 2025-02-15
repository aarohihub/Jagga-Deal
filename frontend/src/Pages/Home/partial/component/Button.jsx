import React from "react";

function Button() {
  return (
    <button className="ml-2 mt-8 group relative inline-flex items-center overflow-hidden rounded-full border-2 border-[#9C1F52] px-12 py-3 text-lg font-medium text-slate-700 hover:bg-gray-50 hover:text-white">
      <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#9C1F52] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
      <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative transform duration-700 group-hover:-translate-x-3 select-none">
        Get Started
      </span>
    </button>
  );
}

export default Button;
