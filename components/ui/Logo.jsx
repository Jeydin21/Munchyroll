import Link from "next/link";

function Logo({ hover = true }) {
  return (
    <Link href="/">
      <div title="Munchyroll" className={`dark:text-secondary text-primary text-3xl font-black ${hover === true ? "hover:scale-105" : ""} transition-all`}>Munchyroll</div>
    </Link>
  );
}

export default Logo;