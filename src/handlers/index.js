const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK;
const apiLink = process.env.NEXT_PUBLIC_CONSUMET_API;


export const getAnimeDetails = async (id) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/data/${id}`)
  return data.json();
};

export const getAnimeEpisodeData = async (id) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/episodes/${id}`)
  return data.json();
}

export const getAnimeEpisodeLinks = async (animeId) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/watch/${animeId}`)
  return data.json();
}

export const getAnimeSearch = async (query) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/search/${query}`)
  return data.json();
}

export const getAnimeTrending = async (count) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/trending?&perPage=${count}`)
  return data.json();
}

export const getAnimePopular = async (count) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/popular?&perPage=${count}`)
  return data.json();
}

export const getAnimeRecentEpisodes = async (count) => {
  const data = await fetch(process.env.NEXT_PUBLIC_CORS_REQUEST_LINK + '/' + apiLink + `/meta/anilist/recent-episodes/?&perPage=${count}`)
  return data.json();
}