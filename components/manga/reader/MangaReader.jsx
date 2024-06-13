import Image from "next/image";

function MangaReader({ pages }) {
  return (
    <div className="items-center justify-center flex flex-col">
        {pages &&
          pages.map((item, index) => (
            <div key={index}>
              <Image
                src={item.img}
                key={index}
                alt={`Page ${index + 1}`}
                width={800}
                height={1000}
                loading="lazy"
                placeholder="blur"
                quality={100}
                unoptimized
                className="py-1"
              />
            </div>
          ))}
      </div>
  );
}

export default MangaReader;