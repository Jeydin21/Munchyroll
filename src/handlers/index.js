import axios from "axios";
export const getPopularAnime = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CONSUMET_API}/popular`);
  return data;
};

export const getAnimeSearch = async (search) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CONSUMET_API}/search?keyw=${search}`);
  return data;
};

export const getTopAiringAnime = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CONSUMET_API}/top-airing`);
  return data;
};

export const getAnimeDetails = async (anime) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CONSUMET_API}anime-details/${anime}`);
  return data;
};

export const getStreamLink = async (episodeId) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_CONSUMET_API}/vidcdn/watch/${episodeId}`);
  return data;
};
