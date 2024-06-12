import MangaCard from "../../manga/MangaCard";

function Recommendations({ mangaData }) {
  return (
    <>
      <h2 className='dark:text-secondary text-primary mt-10 font-semibold'>Manga Recommendations</h2>
      <div className="pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
        {mangaData && mangaData.slice(0, 5).map((manga) => (
          <MangaCard key={manga.id} data={manga} />
        ))}
      </div>
    </>
  )
}

export default Recommendations;