import { useRouter } from "next/router";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

function SearchInput({ type }) {
  const [search, setSearch] = useState();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/${type}/search/${search}`);
  };
  return (
    <div className="p-6 dark:bg-primary border bg-secondary-light border-primary-light rounded-2xl space-y-5">
      <p className="dark:text-secondary text-primary text-lg font-semibold">Looking for something?</p>
    <form onSubmit={handleSubmit} className={`dark:bg-primary sm:w-[350px] rounded-md transition-all h-10 flex items-center space-x-1`}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`dark:text-secondary dark:placeholder:text-secondary-light dark:bg-primary text-primary w-full border border-primary-light rounded-lg outline-none pl-3 h-full`}
        placeholder={"Search " + type + "..."}
      />
      <CgSearch
        onClick={handleSubmit}
        className={`dark:text-secondary text-primary text-3xl hover:cursor-pointer transition-all`}
      />
      </form>
    </div>
  );
}

export default SearchInput;