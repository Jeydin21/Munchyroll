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
            ? "bg-secondary transition-all sm:w-[400px] rounded-t-md"
            : "bg-slate-800 focus-within:bg-slate-900 sm:w-[350px] rounded-md transition-all"
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
          isLandingPage ? "text-black text-xl hover:cursor-pointer transition-all" : "text-white text-xl hover:cursor-pointer transition-all"
        }`}
      />
    </form>
  );
}

export default SearchInput;
