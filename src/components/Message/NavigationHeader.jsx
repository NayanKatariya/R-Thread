import React from "react";

function NavigationHeader({ title }) {
  return (
    <header className="self-start mb-2 text-xl  font-semibold text-neutral-700 max-md:ml-2.5">
      {title}
    </header>
  );
}

export default NavigationHeader;
