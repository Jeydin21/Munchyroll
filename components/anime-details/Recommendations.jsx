import React from 'react'
import Card from '../small-components/Card'

function Recommendations({ data }) {
  return (
    <>
      <h2 className='mt-10 font-semibold'>Recommendations</h2>
      <div className="pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
        {data && data.recommendations && data.recommendations.slice(0, 5).map((anime) => (
          <Card key={anime.id} data={anime} />
        ))}
      </div>
    </>
  )
}

export default Recommendations;