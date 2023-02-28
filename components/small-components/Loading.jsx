import React from "react";

function Loading() {
  const randomNum = Math.floor(Math.random() * 6) + 1;

  return (
    <div className=" flex justify-center items-center min-h-[70vh]">
      <div className=" text-center ">
        <img
          className=" max-w-[200px] aspect-square object-cover"
          src={`/images/loading/1.gif`}
          alt=""
        />
        {/* <div className=" font-semibold   mt-3 animate-pulse">loading...</div> */}
      </div>
    </div>
  );
}

export default Loading;
