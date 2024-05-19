import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { TextButtons } from "../../../components/anime-details/AnimeDetails";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import MainLayout from "../../../components/layout/MainLayout";
import VideoPlayer from "../../../components/Player/VideoPlayer";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";
require('dotenv').config();

export const getServerSideProps = async (context) => {
  const { episodeId, episodeName } = await context.query;

  const episodeData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anime/gogoanime/watch/${episodeName}`,
  );

  const animeData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/info/${episodeId}`,
  );

  const regex = /episode-(\d+)$/;
  const match = episodeName.match(regex);
  let episodeNumber;

  if (match) {
    episodeNumber = Number(match[1]);
  }

  const episode = await episodeData.json();
  const anime = await animeData.json();
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
    getEpisodeData(episodeName).then(episodeData => {
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

  async function getEpisodeData(episodeName) {  
    const url = `${process.env.NEXT_PUBLIC_API_URL}/anime/gogoanime/watch/${episodeName}`;
    
    const episodeData = await fetch(url);
    const episodeStuff = await episodeData.json()
    return episodeStuff;
  }

  const capitalizedName = episodeName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());


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
        <title>{capitalizedName + " - Munchyroll "}</title>
        <meta name="description" content={episode?.synopsis} />
        <meta name="keywords" content={episode?.genres} />
        <meta
          property="og:title"
          content={anime?.title.english || anime?.title.romaji + " - Munchyroll "}
        />
        <meta property="og:description" content={anime?.description} />
        <meta property="og:image" content={anime?.image} />
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
                  <Link className="justify-start" href={`/watch/${episodeName.replace(/-episode-\d+/, '')}-episode-${episodeNumber - 1}`}>
                    <button className="bg-[#2f6b91] hover:bg-[#214861] text-white font-bold py-2 px-4 rounded" onClick={() => { handlePreviousEpisode(); setIsLoading(true); }}>Previous Episode</button>
                  </Link>
                )}
                {episodeNumber < anime.episodes.length && (
                  <Link className="justify-end" href={`/watch/${episodeName.replace(/-episode-\d+/, '')}-episode-${episodeNumber + 1}`}>
                    <button className="bg-[#2f6b91] hover:bg-[#214861] text-white font-bold py-2 px-4 rounded" onClick={() => { handleNextEpisode(); setIsLoading(true); }}>Next Episode</button>
                  </Link>
                  )}
                </div>

                <div className="font-bold hidden sm:block mt-5">
                  <h2 className="  capitalize ">{episodeName.replace(/-/g, ' ')}</h2>
                </div>
              </div>
              <div className="font-bold sm:hidden mt-5">
                <h2 className=" capitalize ">{episodeName.replace(/-/g, ' ')}</h2>

              </div>

              <div className="w-2/5">
              <h2 className="font-semibold lg:text-center mt-10">Episode List</h2>
              <div className=" lg:justify-center lg:px-10 mt-5 flex flex-wrap gap-3">
                {anime.episodes
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
