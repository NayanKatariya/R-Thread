"use client";
import React from "react";

function SearchBar({ setSearch, search }) {
  return (
    <div className="flex flex-col justify-center self-stretch px-1.5 py-1  bg-opacity-0 text-stone-300">
      <div className="flex gap-5 justify-between px-3 py-2.5 rounded-lg border border-solid border-zinc-300">
        <input
          type="text"
          placeholder="Search for a product name or AsiN..."
          className="bg-transparent border-none outline-none w-full text-zinc-700 placeholder-zinc-400"
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8d0cec5ccf693b94c545cabed61d9d68a9458d8?placeholderIfAbsent=true&apiKey=6e145e9e22e040df9495b45716e8896e"
          alt="Search icon"
          className="object-contain shrink-0 aspect-square w-[15px]"
        />
      </div>
    </div>
  );
}

export default SearchBar;
