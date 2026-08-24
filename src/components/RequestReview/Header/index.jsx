"use client";
import React from "react";
import UpdateButton from "./UpdateButton";
import LocationFilter from "./LocationFilter";
import SearchBar from "./SearchBar";

function Header({setSearch,setFilter,filter,search}) {
  return (
    <section className="flex flex-wrap gap-px items-start pt-2 pr-20 pb-2  text-xs  bg-opacity-0 max-md:pr-5">
      <UpdateButton />
      <LocationFilter  setFilter={setFilter} filter={filter}/>
      <SearchBar setSearch={setSearch}  search={search}/>
    </section>
  );
}

export default Header;