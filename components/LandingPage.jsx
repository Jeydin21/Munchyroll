import React from "react";

import Link from "next/link";
import PrimaryButton from "./buttons/PrimaryButton";
import SearchInput from "./small-components/SearchInput";
function LandingPage() {
  const currentTime = new Date();
  const currentHour = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: false,
  });

  var backgroundClass;

  // Define the time ranges for day and night
  const dawn = "06"; // 6 AM
  const noon = "12"; // 12 PM
  const dusk = "16"; // 4 PM
  const night = "20"; // 8 PM

  if (currentHour >= dawn && currentHour < noon) {
    backgroundClass = "from-[#C4AD8A] to-[#19547B]";
  } else if (currentHour >= noon && currentHour < dusk) {
    backgroundClass = "from-[#bdc3c7] to-[#003973]";
  } else if (currentHour >= dusk && currentHour < night) {
    backgroundClass = "from-[#C45656] to-[#2C3E50]";
  } else {
    backgroundClass = "from-[#141E30] to-[#243B55]";
  }

  return (
    <div
      className={`min-h-screen justify-center relative flex items-center bg-gradient-to-t ${backgroundClass}`}
    >
      <div class="custom-shape-divider-bottom-1682184498">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="   px-10 max-w-screen-xl w-full mx-auto relative md:flex items-center space-y-10   justify-between ">
        <div className=" text-secondary  font-semibold">
          <h1 className=" text-4xl font-bold">Munchyroll</h1>
          <h1 className=" text-4xl font-medium text-secondary-light">
            Watch HD Anime For Free
          </h1>
          <br></br>
          <h1 className=" text-2xl font-medium text-secondary-light">
            Share this with friends!
          </h1>
        </div>

        <div>
          <SearchInput isLandingPage={true} />
          <div className="   sm:w-[400px] ">
            <Link href="/home">
              <PrimaryButton>Home</PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
