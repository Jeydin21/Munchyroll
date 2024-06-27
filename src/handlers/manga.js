const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK;
const apiLink = process.env.NEXT_PUBLIC_CONSUMET_API;

export const getMangaDetails = async (id) => {
  const data = await fetch(apiLink + `/meta/anilist-manga/info/${id}?provider=mangadex`)
  return await data.json();
};

export const getMangaPages = async (chapterId) => {
  const data = await fetch(apiLink + `/meta/anilist-manga/read?chapterId=${chapterId}&provider=mangadex`)
  return await data.json();
}

export const getMangaSearch = async (query, count) => {
  const data = await fetch(apiLink + `/meta/anilist-manga/${query}?page=1&perPage=${count}`)
  return await data.json();
}

export const getMangaNew = async (count) => {
  const data = await fetch(apiLink + `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&status=RELEASING&perPage=${count}`)
  return await data.json();
}

export const getMangaTrending = async (count) => {
  const data = await fetch(apiLink + `/meta/anilist/advanced-search?type=MANGA&sort=["TRENDING_DESC"]&perPage=${count}`)
  return await data.json();
}

export const getMangaPopular = async (count) => {
  const data = await fetch(apiLink + `/meta/anilist/advanced-search?type=MANGA&sort=["POPULARITY_DESC"]&perPage=${count}`)
  return await data.json();
}

export const getMangaTop = async (count) => {
  const data = await fetch(apiLink + `/meta/anilist/advanced-search?type=MANGA&sort=["SCORE_DESC"]&perPage=${count}`)
  return await data.json();
}