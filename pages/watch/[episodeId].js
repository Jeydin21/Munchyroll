import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import { TextButtons } from "../../components/anime-details/AnimeDetails";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MainLayout from "../../components/layout/MainLayout";
import VideoPlayer from "../../components/Player/VideoPlayer";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";

export const getServerSideProps = async (context) => {
  const { episodeId } = context.query;

  const episodeData = await fetch(
    `https://munchyroll-api.onrender.com/vidcdn/watch/${episodeId}`,
  );

  const animeData = await fetch(
    `https://munchyroll-api.onrender.com/anime-details/${episodeId.replace(/-episode-\d+/, '')}`,
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

  const [isExternalPlayer, setIsExternalPlayer] = React.useState(true);
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

  // if (!episodeId) {
  //   return <MainLayout>loading...</MainLayout>;
  // }

  // const { episode, isLoading, isError, error } = useQuery("details", () =>
  //   getStreamLink(episodeId)
  // );

  console.log(anime);

  const handleExternalPlayer = () => {
    window.open(episode?.Referer, "_blank");
  };

  const handleVLCPlayer = () => {
    window.open(
      `intent:${episode?.sources[0].file}#Intent;scheme=vlc;package=org.videolan.vlc;end`,
      "_blank",
    );
  };
  const handleMxPlayer = () => {
    //
    window.open(
      `intent:${episode?.sources[0].file}#Intent;scheme=mxplayer;package=com.mxtech.videoplayer.ad;end`,
      "_blank",
    );
  };
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
      <MainLayout useHead={false}>
        {/* {isLoading && <Loading />} */}
        {episode && (
          <div className=" lg:flex lg:space-x-4">
            <div className=" alignfull w-full overflow-hidden max-w-screen-xl rounded-lg">
              {!isExternalPlayer ? (
                <iframe
                  className=" overflow-hidden aspect-[5/4]   sm:aspect-video w-full h-full"
                  src={episode.Referer}
                  allowFullScreen
                  frameborder="0"
                ></iframe>
              ) : (
                <VideoPlayer videoSource={episode?.sources[0].file} />
              )}
              
            </div>

            <div className=" mt-5 lg:mt-0 space-y-4">
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
          </div>
        )}
        <div>
        <h2 className=" font-semibold mt-10">Episodes</h2>
        <div className=" mt-5 flex  flex-wrap  gap-3">
          {anime.episodesList
            ?.slice(0)
            .reverse()
            .map((episode, i) => (
              <TextButtons
                key={i}
                link={`/watch/${episode.episodeId}`}
                text={episode.episodeNum}
                isCurrent={episode.episodeId === episodeId}
              />
            ))}
        </div>
      </div>
      </MainLayout>
    </>
  );
}

export default StreamingPage;
