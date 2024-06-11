import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <div className="dark:text-secondary text-primary text-3xl font-black hover:text-accent transition-all">Munchyroll</div>
    </Link>
  );
}

export default Logo;