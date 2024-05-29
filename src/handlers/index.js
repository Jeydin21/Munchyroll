const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK;
const apiLink = process.env.NEXT_PUBLIC_CONSUMET_API;


export const getAnimeDetails = async (id) => {
  const data = await fetch(apiLink + `/meta/anilist/data/${id}`)
  return await data.json();
};

export const getAnimeEpisodeData = async (id) => {
  const data = await fetch(apiLink + `/meta/anilist/info/${id}`)
  const episodeData = await data.json();
  return episodeData.episodes;
}

export const getAnimeEpisodeLinks = async (animeId) => {
  const data = await fetch(apiLink + `/meta/anilist/watch/${animeId}`)
  return await data.json();
}

export const getAnimeSearch = async (query) => {
  const data = await fetch(apiLink + `/meta/anilist/${query}`)
  return await data.json();
}

export const getAnimeTrending = async (count) => {
  const data = await fetch(apiLink + `/meta/anilist/trending?&perPage=${count}`)
  return await data.json();
}

export const getAnimePopular = async (count) => {
  const data = await fetch(apiLink + `/meta/anilist/popular?&perPage=${count}`)
  return await data.json();
}

export const getAnimeNew = async () => {
  const data = await fetch(apiLink + `/meta/anilist/recent-episodes`)
  return await data.json();
}