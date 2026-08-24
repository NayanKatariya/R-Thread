import React from 'react';
import { RxCopy } from 'react-icons/rx';

export const IconGroup = ({ type }) => {
  if (type === "primary") {
    return (
      <div className="flex gap-2.5 rotate-90">
        <RxCopy color='#5d5d5d'/>
      </div>
    );
  }

  return (
    <div className="flex gap-1 self-start">
      
    </div>
  );
};
