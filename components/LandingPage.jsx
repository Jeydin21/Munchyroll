import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "./buttons/PrimaryButton";
import SearchInput from "./ui/SearchInput";

function LandingPage() {
  return (
    <div
      className={`min-h-screen justify-center relative flex items-center text-primary dark:text-secondary`}
    >
      <div className="max-md:mt-2 max-w-screen-xl w-full relative -mt-48 items-center flex justify-center align-center min-h-screen flex-col">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold">Munchyroll</h1>
          <p className="text-primary dark:text-secondary text-base leading-6">
            Munchyroll is an entertainment platform for people looking to<br />watch millions of movies, series, and animes for free.
          </p>
        </div>
        <div className="space-y-8">
          <div className="py-8 md:py-12">
            <div className="mx-auto max-w-5xl p-6 sm:p-8">
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <a className="flex flex-col justify-between gap-6 rounded-full border border-primary dark:border-secondary p-6 transition-all hover:-mt-2 hover:mb-2 bg-secondary-light dark:bg-[#222222] text-center" href="/anime">
                    <div className="grid gap-4">
                      <h4 className="text-xl text-primary dark:text-secondary">
                        Anime <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                      </h4>
                      <p className="text-base opacity-75 text-primary dark:text-secondary">Explore new anime series!</p>
                    </div>
                  </a>
                  <a className="flex flex-col justify-between gap-6 rounded-full border border-primary dark:border-secondary p-6 transition-all hover:-mt-2 hover:mb-2 bg-secondary-light dark:bg-[#222222] text-center" href="/manga">
                    <div className="grid gap-4">
                      <h4 className="text-xl text-primary dark:text-secondary">
                        Manga <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                      </h4>
                      <p className="text-base opacity-75 text-primary dark:text-secondary">Explore new manga series!</p>
                    </div>
                  </a>
                  <a className="flex flex-col justify-between gap-6 rounded-full border border-primary dark:border-secondary p-6 transition-all hover:-mt-2 hover:mb-2 bg-secondary-light dark:bg-[#222222] text-center">
                    <div className="grid gap-4">
                      <h4 className="text-xl text-primary dark:text-secondary">
                        Movies <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                      </h4>
                      <p className="text-base opacity-75 text-primary dark:text-secondary">Explore the latest movies!</p>
                    </div>
                  </a>
                  <a className="flex flex-col justify-between gap-6 rounded-full border border-primary dark:border-secondary p-6 transition-all hover:-mt-2 hover:mb-2 bg-secondary-light dark:bg-[#222222] text-center">
                    <div className="grid gap-4">
                      <h4 className="text-xl text-primary dark:text-secondary">
                        Shows <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                      </h4>
                      <p className="text-base opacity-75 text-primary dark:text-secondary">Explore the latest shows!</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

export default LandingPage;