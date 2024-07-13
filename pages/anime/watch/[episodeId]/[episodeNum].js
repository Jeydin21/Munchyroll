import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Head from "next/head";
import { useRouter } from 'next/router';
import MainLayout from "../../../../components/ui/MainLayout";
import Link from "next/link";
import { getAnimeDetails, getAnimeEpisodeData, getAnimeEpisodeLinks, getExternalLink } from "../../../../src/handlers/anime";
import AnimeDetails from "../../../../components/anime/info/AnimeDetails";
import EpisodesList from "../../../../components/anime/player/EpisodesList";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";

const VideoPlayer = dynamic(() => import('./../../../../components/anime/player/VideoPlayer'), { ssr: false, loading: () => <div>Loading...</div> });

export const getServerSideProps = async (context) => {
  const { episodeId, episodeNum, dub = false } = await context.query;

  const anime = await getAnimeDetails(episodeId);

  const episode = await getAnimeEpisodeData(episodeId);

  const episodeNumber = parseInt(episodeNum);

  return {
    props: {
      episode,
      anime,
      episodeNumber,
      dub
    },
  };
};

function StreamingPage({ episode, anime, episodeNumber, dub }) {
  const router = useRouter();

  // const [isDubbed, setIsDubbed] = useState(dub);
  const [episodeDataLink, setEpisodeDataLink] = useState(null);
  const [externalLink, setExternalLink] = useState(null);
  // const [dubbedEpisodeDataLink, setDubbedEpisodeDataLink] = useState(null);

  const firstEpisodeNumber = episode[0].number;
  const episodeIndex = firstEpisodeNumber === 0 ? episodeNumber : episodeNumber - 1;

  const episodeName = episode[episodeIndex].id;
  const episodeTitle = episode[episodeIndex].title;

  useEffect(() => {
    const fetchEpisodeData = async () => {
      const episodeData = await getAnimeEpisodeLinks(episodeName);
      setEpisodeDataLink(episodeData.sources[3].url);
    };

    const fetchExternalData = async () => {
      const episodeData = await getExternalLink(episodeName);
      setExternalLink(episodeData.download);
    };

    // const fetchDubbedData = async () => {
    //   const dubbedEpisodeData = await getAnimeEpisodeData(anime.id + "?dub=true");
    //   const episodeData = await getAnimeEpisodeLinks(dubbedEpisodeData[episodeIndex].id);
    //   setDubbedEpisodeDataLink(episodeData.sources[3].url);
    // };

    // if (isDubbed) {
    //   fetchDubbedData();
    //   fetchExternalData();
    // } else {
    //   fetchEpisodeData();
    //   fetchExternalData();
    // }
    fetchEpisodeData();
    fetchExternalData();
  }, [episode, episodeNumber]);

  // if (!episodeId) {
  //   return <MainLayout>loading...</MainLayout>;
  // }

  // const { episode, isLoading, isError, error } = useQuery("details", () =>
  //   getStreamLink(episodeId)
  // );

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
          <div className="mt-3 lg:flex lg:space-x-4 rounded-xl">
            <div className="alignfull w-full overflow-hidden max-w-screen-xl rounded-xl">
              {/* {isDubbed ? (
                <VideoPlayer videoSource={dubbedEpisodeDataLink} key={dubbedEpisodeDataLink} className="rounded-xl " />
              ) : (
                <VideoPlayer videoSource={episodeDataLink} key={episodeDataLink} className="rounded-xl " />
              )} */}
              <VideoPlayer videoSource={episodeDataLink} key={episodeDataLink} className="rounded-xl " />

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
                  <p className="dark:text-secondary text-primary sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{episodeTitle ? (`Episode ${episodeNumber}: ${episodeTitle}`) : (`Episode ${episodeNumber}`)}</p>

                </div>
              </div>
              <AnimeDetails animeData={anime} episodeData={episode} episodePage={true} />
            </div>
            <EpisodesList episodeData={episode} episodeName={episodeName} id={anime.id} isDubbed={false} />
          </div>
          <div className="max-w-xs mt-10 space-y-4">
            {/* {isDubbed ? (
              <PrimaryButton
                icon={<BsFillPlayFill />}
                sub="Classic anime experience"
                onClick={() => {
                  setIsDubbed(false);
                  window.history.replaceState({}, '', `/anime/watch/${anime?.id}/${episodeNumber}?dub=false`);
                  }
                }
              >
                Watch Subbed
              </PrimaryButton>
            ) : (
              <PrimaryButton
                icon={<BsFillPlayFill />}
                sub="English anime experience"
                  onClick={() => {
                    setIsDubbed(true);
                    window.history.replaceState({}, '', `/anime/watch/${anime?.id}/${episodeNumber}?dub=true`);
                    }
                  }
              >
                Watch Dubbed
              </PrimaryButton>
            )} */}
            <PrimaryButton
              icon={<HiOutlineDownload />}
              sub="Watch offline at your convenience"
              link={externalLink}
            >
              Download Episode
            </PrimaryButton>
          </div>
        </MainLayout>
      </div>
    </>
  );
}

export default StreamingPage;
