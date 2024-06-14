import { useEffect, useState } from "react";
import Head from "next/head";
import TextButton from "../../../../../components/buttons/TextButton";
import MainLayout from "../../../../../components/ui/MainLayout";
import MangaReader from "../../../../../components/manga/reader/MangaReader";
import Link from "next/link";
import { getMangaDetails, getMangaPages } from "../../../../../src/handlers/manga";
import next from "next";

export const getServerSideProps = async (context) => {
  const { mangaId, chapterId, chapterNum } = await context.query;

  const manga = await getMangaDetails(mangaId);

  const chapter = await getMangaPages(chapterId);

  const chapterNumber = parseInt(chapterNum);

  return {
    props: {
      chapter,
      manga,
      chapterNumber,
      chapterId
    },
  };
};

function ReadingPage({ manga, chapter, chapterNumber, chapterId }) {
  const currentChapterIndex = manga.chapters.findIndex(chapter => chapter.id === chapterId);
  const prevChapterId = currentChapterIndex > 0 ? manga.chapters[currentChapterIndex - 1].id : null;
  const nextChapterId = currentChapterIndex < manga.chapters.length - 1 ? manga.chapters[currentChapterIndex + 1].id : null;


  return (
    <>
      <Head>
        <title>{"Read " + (manga?.title.english || manga?.title.romaji) + " Chapter " + chapterNumber + " - Munchyroll "}</title>
        <meta name="description" content={manga?.synopsis} />
        <meta name="keywords" content={manga?.genres} />
        <meta
          property="og:title"
          content={"Read " + (manga?.title.english || manga?.title.romaji) + " Chapter " + chapterNumber + " - Munchyroll "}
        />
        <meta property="og:description" content={manga?.description} />
        <meta property="og:image" content={manga?.image} />
        <meta name="theme-color" content={manga?.color} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <div className={`transition-opacity duration-3000`}>
        <MainLayout useHead={false} type={"manga"} manga={true}>
          <div className="pt-5 font-bold text-center sm:block mb-5">
            <div className="dark:text-secondary text-primary capitalize space-y-2">
              <Link className="hover:text-blue-400 transition sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl " href={`/manga/info/${manga?.id}`}>{manga?.title.english || manga?.title.romaji}</Link>
              <p className="dark:text-secondary text-primary sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{"Chapter " + chapterNumber}</p>
            </div>
          </div>
          {chapter && (
            <div className="lg:flex justify-center lg:space-x-4">
              <div className="alignfull w-full overflow-hidden max-w-screen-xl rounded-lg">
                <MangaReader pages={chapter} />
                <div className="flex justify-between pt-5">
                  <Link className={`justify-start ${(chapterNumber > 1) ? "" : "invisible"}`} href={`/manga/read/${manga.id}/${prevChapterId}/${chapterNumber - 1}`}>
                    <button title="Go to the previous chapter" className="bg-[#2f6b91] hover:bg-[#214861] transition-all text-white font-bold m-4 py-2 px-4 rounded">&#x2190; Chapter {chapterNumber - 1} </button>
                  </Link>
                  <Link className={`justify-end ${(chapterNumber < manga.chapters.length) ? "" : "invisible"}`} href={`/manga/read/${manga.id}/${nextChapterId}/${chapterNumber + 1}`}>
                    <button title="Go to the next chapter" className="bg-[#2f6b91] hover:bg-[#214861] transition-all text-white font-bold m-4 py-2 px-4 rounded">Chapter {chapterNumber + 1} &#x2192;</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </MainLayout>
      </div>
    </>
  );
}

export default ReadingPage;
