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
                alt="Pages"
                width={800}
                height={1000}
                priority
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