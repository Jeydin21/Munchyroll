import React from "react";
import Link from "next/link";
import { FaBook, FaStar, FaCalendar, FaPlay } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Card({ data }) {
  const [seriesData, setSeriesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONSUMET_API}/meta/anilist/info/${data.id}`);
        const result = await response.json();
        setSeriesData(result);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [data.id]);

  if (!seriesData) return null; // or a loading spinner

  return (
    <Link href={"/anime/" + seriesData.id}>
  <div className="group sm:p-3">
    <div className="overflow-hidden rounded-lg relative">
      <div className="transition-all transform duration-300 group-hover:scale-105 group-hover:brightness-50">
        <LazyLoadImage
          effect="blur"
          className="w-full aspect-[5/7] object-cover rounded-lg"
          src={seriesData.image}
          alt=""
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FaPlay className="text-4xl text-white" />
      </div>
    </div>

    <div className="">
      <h4 className="mt-3 font-bold line-clamp-2">{seriesData.title.english || seriesData.title.romaji}</h4>

      {/* <p>Episode {seriesData.episodeNumber}</p> */}
          <div className="flex space-x-4 mt-2 text-white select-none">
            <p>{seriesData.type}</p>
            {seriesData.releaseDate && (
              <p>
                <span className="flex items-center">
                  <FaCalendar />
                  <span className="ml-1">{seriesData.releaseDate}</span>
                </span>
              </p>
            )}
            {seriesData.totalEpisodes && seriesData.totalEpisodes != 1 && (
              <p>
                <span className="flex items-center">
                  <FaBook />
                  <span className="ml-1">{seriesData.totalEpisodes}</span>
                </span>
              </p>
            )}
            {seriesData.rating && (
              <p>
                <span className="flex items-center">
                  <FaStar />
                  <span className="ml-1">{seriesData.rating}</span>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
