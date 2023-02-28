import React from "react";

function PrimaryButton({ children, sub, icon, onClick }) {
  return (
    <button
      className="cursor-pointer hover:bg-primary-hover transition-all bg-primary-light px-5 text-gray-100 text-left font-medium w-full   p-2"
      onClick={onClick}
    >
      <div className=" flex  space-x-3 items-center">
        {icon && <div className=" text-2xl py-2">{icon}</div>}

        <div>
          <div>{children}</div>

          <div className=" text-sm font-light text-secondary-light">{sub}</div>
        </div>
      </div>
    </button>
  );
}

export default PrimaryButton;
