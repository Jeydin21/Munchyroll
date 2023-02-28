import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/home">
      <div className=" text-3xl font-semibold ">Zubayr Theater</div>
    </Link>
  );
}

export default Logo;
