import { useState, useEffect } from "react";
import Logo from "../small-components/Logo";
import SearchInput from "../small-components/SearchInput";
import { CgSearch } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hour, setHour] = useState();

  useEffect(() => {
    const time = new Date();
    setHour(time.getHours());
  });

  var backgroundClass;

  // Define the time ranges for day and night
  const dawn = 6; // 6 AM
  const noon = 12; // 12 PM
  const dusk = 16; // 4 PM
  const night = 20; // 8 PM

  if (hour >= dawn && hour < noon) {
    backgroundClass = "from-[#C4AD8A] to-[#19547B]";
  } else if (hour >= noon && hour < dusk) {
    backgroundClass = "from-[#bdc3c7] to-[#003973]";
  } else if (hour >= dusk && hour < night) {
    backgroundClass = "from-[#C45656] to-[#2C3E50]";
  } else {
    backgroundClass = "from-[#141E30] to-[#243B55]";
  }

  return (
    <>
      <div
        className={`p-5 px-5 sm:px-10 border-b-[1px] border-gray-600 bg-${backgroundClass}/90 backdrop-blur-sm z-50 flex justify-between left-0 items-center top-0 right-0 `}
      >
        <Logo />

        <div className=" hidden lg:block">
          <SearchInput />
        </div>

        <div className=" flex justify-center items-center lg:hidden text-xl">
          {isMenuOpen ? (
            <VscChromeClose onClick={() => setIsMenuOpen(false)} />
          ) : (
            <CgSearch onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </div>

      <div
        className={` bg-primary/90 backdrop-blur-md transition-all pt-24 p-5     z-20 fixed h-[160px] rounded-b-xl  ${
          isMenuOpen ? "top-0" : "-top-full"
        }  w-screen `}
      >
        <SearchInput />
      </div>
    </>
  );
}

export default Header;
