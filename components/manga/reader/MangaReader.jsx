import Image from "next/image";

function MangaReader({ pages }) {
  const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK;

  return (
    <div className="items-center justify-center flex flex-col">
        {pages &&
          pages.map((item, index) => (
            <div key={index}>
              <Image
                src={`${corsLink}/${item.img}`}
                key={index}
                alt={`Page ${index + 1}`}
                width={600}
                height={1000}
                loading="lazy"
                quality={100}
                unoptimized
                className="py-2"
              />
            </div>
          ))}
      </div>
  );
}

export default MangaReader;