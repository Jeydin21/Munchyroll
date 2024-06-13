import Image from "next/image";

function MangaReader({ pages }) {
  return (
    <div className="items-center justify-center flex flex-col">
        {pages &&
          pages.map((item, index) => (
            <div key={index}>
              <Image
                src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item.img}&headers=https://mangadex.org`}
                key={index}
                alt="Pages"
                width={800}
                height={1000}
                priority
                quality={100}
                unoptimized
              />
            </div>
          ))}
      </div>
  );
}

export default MangaReader;