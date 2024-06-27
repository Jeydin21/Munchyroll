import MangaCard from '../MangaCard'

function Recommendations({ mangaData }) {
  return (
    <>
      <h2 className='dark:text-secondary text-primary mt-10 font-semibold'>Recommendations</h2>
      <div className="pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7 3xl:grid-cols-8">
        {mangaData && mangaData.slice(0, 8).map((manga) => (
          <MangaCard key={manga.id} data={manga} />
        ))}
      </div>
    </>
  )
}

export default Recommendations;