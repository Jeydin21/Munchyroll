import { useState } from 'react';

import Trending from "../../components/manga/layout/Trending";
import Popular from "../../components/manga/layout/Popular";
import Top from "../../components/manga/layout/Top";
import New from "../../components/manga/layout/New";

function MangaList() {
  const [display, setDisplay] = useState('New');

  return (
    <>
      <br />
      <div className="button-menu">
        <div className="flex justify-center">
          <button title='Newest Tab' className={`w-auto m-1 p-2 md:px-5 md:py-3 transition duration-300 dark:text-secondary text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'New' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('New')}>
            Newest
          </button>
          <button title='Trending Tab' className={`w-auto m-1 p-2 md:px-5 md:py-3  transition duration-300 dark:text-secondary text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'Trending' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('Trending')}>
            Trending
          </button>
          <button title='Popular Tab' className={`w-auto m-1 p-2 md:px-5 md:py-3  transition duration-300 dark:text-secondary text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'Popular' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('Popular')}>
            Popular
          </button>
          <button title='Top Rated Tab' className={`w-auto m-1 p-2 md:px-5 md:py-3 transition duration-300 dark:text-secondary truncate text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'Top' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('Top')}>
            Top Rated
          </button>
        </div>
      </div>
      <br></br>
      {display === 'New' && <New />}
      {display === 'Trending' && <Trending />}
      {display === 'Popular' && <Popular />}
      {display === 'Top' && <Top />}
      <br></br>
      <br></br>
      <br></br>
    </>
  )
}

export default MangaList;