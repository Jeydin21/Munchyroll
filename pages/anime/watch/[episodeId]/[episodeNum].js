import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Head from "next/head";
import TextButton from "../../../../components/buttons/TextButton";
import MainLayout from "../../../../components/ui/MainLayout";
import Link from "next/link";
import { getAnimeDetails, getAnimeEpisodeData, getAnimeEpisodeLinks } from "../../../../src/handlers/anime";
import AnimeDetails from "../../../../components/anime/info/AnimeDetails";
import EpisodesList from "../../../../components/anime/player/EpisodesList";

const VideoPlayer = dynamic(() => import('./../../../../components/anime/player/VideoPlayer'), { ssr: false, loading: () => <div>Loading...</div> });

export const getServerSideProps = async (context) => {
  const { episodeId, episodeNum } = await context.query;

  const anime = await getAnimeDetails(episodeId);

  const episode = await getAnimeEpisodeData(episodeId);

  const episodeNumber = parseInt(episodeNum);

  return {
    props: {
      episode,
      anime,
      episodeNumber,
    },
  };
};

function StreamingPage({ episode, anime, episodeNumber }) {
  const [isExternalPlayer, setIsExternalPlayer] = useState(true);
  const [episodeDataLink, setEpisodeDataLink] = useState(null);

  const episodeName = episode[episodeNumber - 1].id;
  const episodeTitle = episode[episodeNumber - 1].title;


  useEffect(() => {
    const fetchEpisodeData = async () => {
      const episodeData = await getAnimeEpisodeLinks(episodeName);
      setEpisodeDataLink(episodeData.sources[3].url);
    };

    fetchEpisodeData();
  }, [episode, episodeNumber]);

  // if (!episodeId) {
  //   return <MainLayout>loading...</MainLayout>;
  // }

  // const { episode, isLoading, isError, error } = useQuery("details", () =>
  //   getStreamLink(episodeId)
  // );

  // const handleExternalPlayer = () => {
  //   window.open(episode?.Referer, "_blank");
  // };

  // const handleVLCPlayer = () => {
  //   window.open(
  //     `intent:${episode?.sources[0].file}#Intent;scheme=vlc;package=org.videolan.vlc;end`,
  //     "_blank",
  //   );
  // };
  // const handleMxPlayer = () => {
  //   //
  //   window.open(
  //     `intent:${episode?.sources[0].file}#Intent;scheme=mxplayer;package=com.mxtech.videoplayer.ad;end`,
  //     "_blank",
  //   );
  // };

  return (
    <>
      <Head>
        <title>{"Watch " + (anime?.title.english || anime?.title.romaji) + " Episode " + episodeNumber + " - Munchyroll "}</title>
        <meta name="description" content={anime?.synopsis} />
        <meta name="keywords" content={anime?.genres} />
        <meta
          property="og:title"
          content={"Watch " + (anime?.title.english || anime?.title.romaji) + " Episode " + episodeNumber + " - Munchyroll "}
        />
        <meta property="og:description" content={anime?.description} />
        <meta property="og:image" content={anime?.image} />
        <meta name="theme-color" content={anime?.color} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <div className={`transition-opacity duration-3000`}>
        <MainLayout useHead={false} type={"anime"}>
          {episode && (
            <div className="mt-3 lg:flex lg:space-x-4">
              <div className="alignfull w-full overflow-hidden max-w-screen-xl">
                {!isExternalPlayer ? (
                  <iframe
                    className=" overflow-hidden aspect-[5/4] sm:aspect-video w-full h-full"
                    src={videoSource}
                    allowFullScreen
                    frameborder="0"
                  ></iframe>
                ) : (
                  <VideoPlayer videoSource={episodeDataLink} key={episodeNumber} className="rounded-xl " />
                )}

                {/* <div className="flex justify-between pt-5">
                  <Link className={`justify-start ${(episodeNumber > 1) ? "" : "invisible"}`} href={`/anime/watch/${anime.id}/${episodeNumber - 1}`}>
                    <button title="Go to the previous episode" className="bg-[#2f6b91] hover:bg-[#214861] transition-all text-white font-bold m-4 py-2 px-4 rounded" onClick={() => { handlePreviousEpisode(); setIsLoading(true); }}>&#x2190; Episode {episodeNumber - 1} </button>
                  </Link>
                  <Link className={`justify-end ${(episodeNumber < episode.length) ? "" : "invisible"}`} href={`/anime/watch/${anime.id}/${episodeNumber + 1}`}>
                    <button title="Go to the next episode" className="bg-[#2f6b91] hover:bg-[#214861] transition-all text-white font-bold m-4 py-2 px-4 rounded" onClick={() => { handleNextEpisode(); setIsLoading(true); }}>Episode {episodeNumber + 1} &#x2192;</button>
                  </Link>
                </div> */}
                <div className="pt-5 font-bold max-lg:text-center sm:block mb-5">
                  <div className="dark:text-secondary text-primary capitalize space-y-2">
                    <Link className="hover:text-blue-400 transition sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl " href={`/anime/info/${anime?.id}`}>{anime?.title.english || anime?.title.romaji}</Link>
                    <p className="dark:text-secondary text-primary sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{"Episode " + episodeNumber + ": " + episodeTitle}</p>
                  </div>
                </div>
                <AnimeDetails animeData={anime} episodeData={episode} episodePage={true} />
              </div>
              <EpisodesList episodeData={episode} episodeName={episodeName} id={anime.id} />
            </div>
          )}
          {/* <div className="max-w-xs mt-10 space-y-4">
            {!isExternalPlayer ? (
              <PrimaryButton
                icon={<BsFillPlayFill />}
                sub="Faster And No Ads"
                onClick={() => setIsExternalPlayer(!isExternalPlayer)}
              >
                Use Internal Player
              </PrimaryButton>
            ) : (
              <PrimaryButton
                icon={<HiOutlineDownload />}
                sub="Download Option Available"
                onClick={() => setIsExternalPlayer(!isExternalPlayer)}
              >
                Use External Player
              </PrimaryButton>
            )}
          </div> */}
        </MainLayout>
      </div>
    </>
  );
}

export default StreamingPage;
