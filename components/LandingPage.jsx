import React from "react";

import Link from "next/link";
import PrimaryButton from "./buttons/PrimaryButton";
import SearchInput from "./small-components/SearchInput";
function LandingPage() {
  return (
    <div className=" min-h-screen justify-center relative flex items-center bg-background">
      <div className="   px-10 max-w-screen-xl w-full mx-auto relative md:flex items-center space-y-10   justify-between ">
        <div className=" text-secondary  font-semibold">
          <h1 className=" text-4xl font-bold">Munchyroll</h1>
          <h1 className=" text-4xl font-medium text-secondary-light">
            Come watch some shows!
          </h1>
        </div>

        <div>
          <SearchInput isLandingPage={true} />
          <div className="   sm:w-[400px] ">
            <Link href="/home">
              <PrimaryButton>Venue</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
