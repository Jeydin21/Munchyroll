import { useRouter } from "next/router";
import React from "react";
import { CgSearch } from "react-icons/cg";
function SearchInput({ isLandingPage = false }) {
  const [search, setSearch] = React.useState();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // without react router
    // window.location.href = `/search/${search}`;
    if (!search) return;
    router.push(`/search/${search}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={` ${`
        ${
          isLandingPage
            ? "bg-secondary sm:w-[400px]"
            : "bg-primary-light sm:w-[350px]"
        }   h-10`}

        flex items-center  shadow-md px-5
        `}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={` ${
          isLandingPage ? "text-black" : "text-white"
        } w-full outline-none p-3 px-0  h-full bg-transparent`}
        placeholder="Search"
      />
      <CgSearch
        onClick={handleSubmit}
        className={`${
          isLandingPage ? "text-black text-xl" : "text-white text-xl"
        }`}
      />
    </form>
  );
}

export default SearchInput;
