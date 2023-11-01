import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function SearchCard({ data }) {
  return (
    <Link href={"/anime/" + data.animeId}>
      <div className="     sm:p-3   ">
        <img
          className=" hover:scale-105 transition-all w-full aspect-[5/7] object-cover rounded-lg"
          src={data.animeImg}
          alt=""
        />

        <div>
          <h4 className=" mt-3 font-bold  line-clamp-2">{data.animeTitle}</h4>

          <p>{data.status}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
