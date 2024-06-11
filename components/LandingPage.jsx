import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "./buttons/PrimaryButton";
import SearchInput from "./ui/SearchInput";

function LandingPage() {
  const [hour, setHour] = useState();

  useEffect(() => {
    const time = new Date();
    setHour(time.getHours());
  });

  var welcomeMessage;

  const dawn = "06"; // 6 AM
  const noon = "12"; // 12 PM
  const dusk = "16"; // 4 PM
  const night = "20"; // 8 PM

  if (hour >= dawn && hour < noon) {
    welcomeMessage = "Good morning 🌅";
  } else if (hour >= noon && hour < dusk) {
    welcomeMessage = "Good afternoon 🏙️";
  } else if (hour >= dusk && hour < night) {
    welcomeMessage = "Good evening 🌇";
  } else {
    welcomeMessage = "Good night 🌃";
  }

  return (
    <div
      className={`min-h-screen justify-center relative flex items-center text-primary dark:text-secondary`}
    >
      <div className="max-w-screen-xl w-full relative items-center flex justify-center align-center min-h-screen flex-col">
        <div className="font-semibold text-center">
          <h1 className="text-4xl font-bold">Munchyroll</h1>
          <h1 className=" text-4xl font-medium">
            No ads. Just anime.
          </h1>
          <br></br>
          <h1 className=" text-2xl font-medium">
            {welcomeMessage}
          </h1>
          <h1 className=" text-2xl font-medium">
            Share this with friends!
          </h1>
        </div>
      </div>


    </div>
  );
}

export default LandingPage;