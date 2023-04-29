import { useRouter } from "next/router";
import React from "react";
import Head from "next/head"
import { useQuery } from "react-query";
import { TextButtons } from "../../components/anime-details/AnimeDetails";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MainLayout from "../../components/layout/MainLayout";
import VideoPlayer from "../../components/Player/VideoPlayer";
import { getStreamLink } from "../../src/handlers";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FcVlc } from "react-icons/fc";
import Loading from "../../components/small-components/Loading";
import { BsFillPlayFill } from "react-icons/bs";

export const getServerSideProps = async (context) => {
	const { episodeId } = context.query;

	const res = await fetch(
		`https://api.munchyroll.ml/vidcdn/watch/${episodeId}`
	);

	const data = await res.json();

	return {
		props: {
			data,
			episodeId
		},
	};
};

function StreamingPage({ data, episodeId }) {
	const router = useRouter();

	const [isExternalPlayer, setIsExternalPlayer] = React.useState(true);
	// const { episodeId } = router.query;

	// get the search id from the url with javascript

	const chicken = episodeId
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

	// const { data, isLoading, isError, error } = useQuery("details", () =>
	//   getStreamLink(episodeId)
	// );

	console.log(data);

	const handleExternalPlayer = () => {
		window.open(data?.Referer, "_blank");
	};

	const handleVLCPlayer = () => {
		window.open(
			`intent:${data?.sources[0].file}#Intent;scheme=vlc;package=org.videolan.vlc;end`,
			"_blank"
		);
	};
	const handleMxPlayer = () => {
		//
		window.open(
			`intent:${data?.sources[0].file}#Intent;scheme=mxplayer;package=com.mxtech.videoplayer.ad;end`,
			"_blank"
		);
	};
	return (
		<>
			<Head>
				<title>{capitalizedEpisodeName + " - Munchyroll "}</title>
				<meta name="description" content={data?.synopsis} />
				<meta name="keywords" content={data?.genres} />
				<meta
					property="og:title"
					content={data?.animeTitle + " - Munchyroll "}
				/>
				<meta property="og:description" content={data?.synopsis} />
				<meta property="og:image" content={data?.animeImg} />
				<meta name="theme-color" content="#C4AD8A" />
				{/* Maybe change this to scan image and return main color */}
			</Head>
			<MainLayout useHead={false}>
				{/* {isLoading && <Loading />} */}
				{data && (
					<div className=" lg:flex lg:space-x-4">
						<div className=" alignfull w-full overflow-hidden max-w-screen-xl">
							{!isExternalPlayer ? (
								<iframe
									className=" overflow-hidden aspect-[5/4]   sm:aspect-video w-full h-full"
									src={data.Referer}
									allowFullScreen
									frameborder="0"></iframe>
							) : (
								<VideoPlayer videoSource={data?.sources[0].file} />
							)}

							<div className="  hidden sm:block mt-5">
								<h2 className="  capitalize ">{episodeName}</h2>
							</div>
						</div>
						<div className=" sm:hidden  mt-5">
							<h2 className=" capitalize ">{episodeName}</h2>
						</div>

						<div className=" mt-5 lg:mt-0 space-y-4">
							{!isExternalPlayer ? (
								<PrimaryButton
									icon={<BsFillPlayFill />}
									sub="Faster And No Ads"
									onClick={() => setIsExternalPlayer(!isExternalPlayer)}>
									Use Internal Player
								</PrimaryButton>
							) : (
								<PrimaryButton
									icon={<HiOutlineDownload />}
									sub="Download Option Available"
									onClick={() => setIsExternalPlayer(!isExternalPlayer)}>
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
			</MainLayout>
		</>
	);
}

export default StreamingPage;
