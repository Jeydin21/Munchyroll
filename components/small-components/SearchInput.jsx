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
            ? "bg-secondary sm:w-[400px] rounded-t-md"
            : "bg-slate-900 sm:w-[350px] rounded-md"
        }   h-10`}

        flex items-center px-5
        `}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={` ${
          isLandingPage ? "text-black" : "text-white"
        } w-full outline-none p-3 px-0 h-full bg-transparent`}
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
