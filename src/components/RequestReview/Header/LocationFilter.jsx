"use client";
import React from "react";

function LocationFilter({ setFilter, filter }) {
  return (
    <button className="flex flex-col justify-center p-0.5 mt-1.5 text-xs whitespace-nowrap  bg-opacity-0 text-zinc-500">
      <span className="flex gap-2 px-2.5 py-2 rounded-xl border border-solid border-zinc-300">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f9ac46d7c46c7034e86cb9461500b9f51070f45?placeholderIfAbsent=true&apiKey=6e145e9e22e040df9495b45716e8896e"
          alt="USA flag"
          className="object-contain shrink-0 aspect-[1.39] w-[18px]"
        />
        <span>USA</span>
      </span>
    </button>
  );
}

export default LocationFilter;