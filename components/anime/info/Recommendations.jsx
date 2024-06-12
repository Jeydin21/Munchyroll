import AnimeCard from '../AnimeCard'

function Recommendations({ animeData }) {
  return (
    <>
      <h2 className='dark:text-secondary text-primary mt-10 font-semibold'>Recommendations</h2>
      <div className="pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-6 3xl:grid-cols-8">
        {animeData && animeData.slice(0, 8).map((anime) => (
          <AnimeCard key={anime.id} data={anime} />
        ))}
      </div>
    </>
  )
}

export default Recommendations;