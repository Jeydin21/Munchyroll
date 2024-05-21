import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/home">
      <div className="dark:text-secondary text-primary text-3xl font-black hover:text-accent transition-all">Munchyroll</div>
    </Link>
  );
}

export default Logo;
