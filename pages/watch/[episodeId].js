import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { TextButtons } from "../../components/anime-details/AnimeDetails";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MainLayout from "../../components/layout/MainLayout";
import VideoPlayer from "../../components/Player/VideoPlayer";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const { episodeId } = await context.query;
  let thing = episodeId.replace(/-episode-\d+/, '')
  if(thing === 'jujutsu-kaisen-2nd-season') thing = 'jujutsu-kaisen-tv-2nd-season'

  const episodeData = await fetch(
    `https://munchyroll-api.j21.dev/vidcdn/watch/${episodeId}`,
  );

  const animeData = await fetch(
    `https://munchyroll-api.j21.dev/anime-details/${thing}`,
  );

  const episode = await episodeData.json();
  const anime = await animeData.json();
  return {
    props: {
      episode,
      anime,
      episodeId,
    },
  };
};

function StreamingPage({ episode, anime, episodeId }) {
  const router = useRouter();

  const [isExternalPlayer, setIsExternalPlayer] = useState(true);
  const [videoSource, setVideoSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const [triggerRender, setTriggerRender] = useState(false);
  const [fadeout, setFadeout] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  // const { episodeId } = router.query;

  // get the search id from the url with javascript

  const chicken = episodeId;
  const episodeName = chicken.split("-").join(" ");

  const arr = episodeName.split(" ");

  //loop through each element of the array and capitalize the first letter.

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  const capitalizedEpisodeName = arr.join(" ");

  const episodeNumber = parseInt(episodeId.split('-').pop());

  useEffect(() => {
    getEpisodeData(episodeNumber).then(episodeData => {
      setVideoSource(episodeData.sources[0].file);
      setFadeout(true);
      setTimeout(() => setIsLoading(false), 1500); // Adjust delay to match transition duration
      setTimeout(() => setFadeIn(true), 2000); // Adjust delay to match transition duration
    }).catch(error => {
      console.error(error);
    });
  }, [episodeId, triggerRender]);

  async function getEpisodeData(episodeNum) {
    const episodeData = await fetch(
      `https://munchyroll-api.j21.dev/vidcdn/watch/${episodeId.replace(/-episode-\d+/, '')}-episode-${episodeNum}`,
    );
    const episodeStuff = await episodeData.json()
    return episodeStuff;
  }

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
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>)
  }
  return (
    <>
      <Head>
        <title>{capitalizedEpisodeName + " - Munchyroll "}</title>
        <meta name="description" content={episode?.synopsis} />
        <meta name="keywords" content={episode?.genres} />
        <meta
          property="og:title"
          content={episode?.animeTitle + " - Munchyroll "}
        />
        <meta property="og:description" content={episode?.synopsis} />
        <meta property="og:image" content={episode?.animeImg} />
        <meta name="theme-color" content="#C4AD8A" />
        <link rel="manifest" href="public/manifest.json" />
        {/* Maybe change this to scan image and return main color */}
      </Head>
      <div className={`transition-opacity duration-3000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <MainLayout useHead={false}>
          {episode && (
            <div className=" lg:flex lg:space-x-4">
              <div className=" alignfull w-full overflow-hidden max-w-screen-xl rounded-lg">
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
                  <Link className="justify-start" href={`/watch/${episodeId.replace(/-episode-\d+/, '')}-episode-${episodeNumber - 1}`}>
                    <button className="bg-[#2f6b91] hover:bg-[#214861] text-white font-bold py-2 px-4 rounded" onClick={() => { handlePreviousEpisode(); setIsLoading(true); }}>Previous Episode</button>
                  </Link>
                )}
                {episodeNumber < anime.episodesList.length && (
                  <Link className="justify-end" href={`/watch/${episodeId.replace(/-episode-\d+/, '')}-episode-${episodeNumber + 1}`}>
                    <button className="bg-[#2f6b91] hover:bg-[#214861] text-white font-bold py-2 px-4 rounded" onClick={() => { handleNextEpisode(); setIsLoading(true); }}>Next Episode</button>
                  </Link>
                  )}
                </div>

                <div className="font-bold hidden sm:block mt-5">
                  <h2 className="  capitalize ">{episodeName}</h2>
                </div>
              </div>
              <div className="font-bold sm:hidden mt-5">
                <h2 className=" capitalize ">{episodeName}</h2>

              </div>

              <div>
              <h2 className="font-semibold lg:text-center mt-10">Episode List</h2>
              <div className="lg:justify-center lg:px-20 mt-5 flex flex-wrap gap-3">
                {anime.episodesList
                  ?.slice(0)
                  .reverse()
                  .map((episode, i) => (
                    <TextButtons
                      key={i}
                      link={`/watch/${episode.episodeId}`}
                      text={episode.episodeNum}
                      isCurrent={episode.episodeId === episodeId}
                      onClick={() => getEpisodeData(episode.episodeNum).then(episodeData => {
                        setVideoSource(episodeData.sources[0].file); setIsLoading(true);
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
          <div className="max-w-xs mt-10 space-y-4">
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
          </div>
        </MainLayout>
      </div>
    </>
  );
}

export default StreamingPage;
