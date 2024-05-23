import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { TextButtons } from "../../../components/anime-details/AnimeDetails";
import MainLayout from "../../../components/layout/MainLayout";
import VideoPlayer from "../../../components/Player/VideoPlayer";
import Link from "next/link";
import { getAnimeDetails, getAnimeEpisodeData, getAnimeEpisodeLinks } from "../../../src/handlers/index";
import EpisodesList from "../../../components/Player/EpisodesList";

export const getServerSideProps = async (context) => {
  const { episodeId, episodeName } = await context.query;

  const anime = await getAnimeDetails(episodeId);

  const episode = await getAnimeEpisodeData(episodeId);

  const regex = /episode-(\d+)$/;
  const match = episodeName.match(regex);
  let episodeNumber;

  if (match) {
    episodeNumber = Number(match[1]);
  }

  // const episode = await episodeData.json();
  // const anime = await animeData.json();
  return {
    props: {
      episode,
      anime,
      episodeName,
      episodeNumber
    },
  };
};

function StreamingPage({ episode, anime, episodeName, episodeNumber }) {
  const router = useRouter();

  const [isExternalPlayer, setIsExternalPlayer] = useState(true);
  const [videoSource, setVideoSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const [triggerRender, setTriggerRender] = useState(false);
  const [fadeout, setFadeout] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  // const { episodeId } = router.query;

  // get the search id from the url with javascript

  //loop through each element of the array and capitalize the first letter.

  //Join all the elements of the array back into a string
  //using a blankspace as a separator

  useEffect(() => {
    getAnimeEpisodeLinks(episodeName).then(episodeData => {
      console.log(episodeData)
      setVideoSource(episodeData.sources[3].url);
      setFadeout(true);
      setTimeout(() => setIsLoading(false), 1500); // Adjust delay to match transition duration
      setTimeout(() => setFadeIn(true), 2000); // Adjust delay to match transition duration
    }).catch(error => {
      console.error(error);
    });
  }, [episodeName, triggerRender]);

  const handleNextEpisode = () => {
    // Your existing code...
    setTriggerRender(prevState => !prevState);
  };

  const handlePreviousEpisode = () => {
    // Your existing code...
    setTriggerRender(prevState => !prevState);
  };

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

  if (isLoading) {
    return (<div className={`flex items-center justify-center h-screen transition-opacity duration-1000 ${fadeout ? 'opacity-0' : 'opacity-100'}`}>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:border-purple-500"></div>
    </div>)
  }
  return (
    <>
      <Head>
        <title>{(anime?.title.english || anime?.title.romaji) + " Episode " + episodeNumber + " - Munchyroll "}</title>
        <meta name="description" content={anime?.synopsis} />
        <meta name="keywords" content={anime?.genres} />
        <meta
          property="og:title"
          content={(anime?.title.english || anime?.title.romaji) + " Episode " + episodeNumber + " - Munchyroll "}
        />
        <meta property="og:description" content={anime?.description} />
        <meta property="og:image" content={anime?.image} />
        <meta name="theme-color" content={anime?.color} />
        <link rel="manifest" href="public/manifest.json" />
        {/* Maybe change this to scan image and return main color */}
      </Head>
      <div className={`transition-opacity duration-3000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <MainLayout useHead={false}>
          <div className="font-bold max-lg:text-center sm:block mb-5">
            <h2 className="dark:text-secondary text-primary  capitalize ">{(anime?.title.english || anime?.title.romaji) + " Episode " + episodeNumber}</h2>
          </div>
          {episode && (
            <div className="lg:flex lg:space-x-4">
              <div className="alignfull w-full overflow-hidden max-w-screen-xl rounded-lg">
                {!isExternalPlayer ? (
                  <iframe
                    className=" overflow-hidden aspect-[5/4]   sm:aspect-video w-full h-full"
                    src={videoSource}
                    allowFullScreen
                    frameborder="0"
                  ></iframe>
                ) : (
                  <VideoPlayer videoSource={videoSource} />
                )}

                <div className="flex justify-between pt-5">
                  {episodeNumber > 1 && (
                    <Link className="justify-start" href={`/watch/${anime.id}/${episodeName.replace(/-episode-\d+/, '')}-episode-${episodeNumber - 1}`}>
                      <button className="bg-[#2f6b91] hover:bg-[#214861] transition-all text-white font-bold m-4 py-2 px-4 rounded" onClick={() => { handlePreviousEpisode(); setIsLoading(true); }}>&#x2190; Episode {episodeNumber - 1} </button>
                    </Link>
                  )}
                  {episodeNumber < episode.length && (
                    <Link className="justify-end" href={`/watch/${anime.id}/${episodeName.replace(/-episode-\d+/, '')}-episode-${episodeNumber + 1}`}>
                      <button className="bg-[#2f6b91] hover:bg-[#214861] transition-all text-white font-bold m-4 py-2 px-4 rounded" onClick={() => { handleNextEpisode(); setIsLoading(true); }}>Episode {episodeNumber + 1} &#x2192;</button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="max-sd:w-2/5 lg:w-2/5">
              <h2 className="dark:text-secondary text-primary font-semibold text-center mt-10">Episode List</h2>
              <div className="justify-center px-10 mt-5 flex flex-wrap gap-3">
                {episode
                  ?.slice(0)
                  .map((episode, i) => (
                    <TextButtons
                      key={i}
                      link={`/watch/${anime.id}/${episode.id}`}
                      text={episode.number}
                      isCurrent={episode.id === episodeName}
                      onClick={() => getEpisodeData(episode.id).then(episodeData => {
                        setVideoSource(episodeData.sources[3].url); setIsLoading(true);
                        }).catch(error => {
                          console.error(error);
                        })
                        }
                    />
                  ))}
              </div>
            </div>

              {/*<PrimaryButton
								icon={<BsFillPlayCircleFill />}
								onClick={handleMxPlayer}
								sub="Android (Experimental)">
								Open in MX Player
							</PrimaryButton>
							<PrimaryButton
								sub="Android (Experimental)"
								icon={<FcVlc />}
								onClick={handleVLCPlayer}>
								Open in VLC
							</PrimaryButton>
							*/}
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
