import Image from "next/image";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

import bgImage from "../../public/photography-bg.jpg";

import { GetStaticProps } from "next";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import lqip from "lqip-modern";
import { Photo } from "@/types/types";
import { Gallery } from "@/components/Gallery";

const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "oceans",
    display: "Oceans",
  },
  {
    key: "cities",
    display: "Cities",
  },
];
type HomeProps = {
  oceans: Photo[];
  cities: Photo[];
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    fetch: nodeFetch as unknown as typeof fetch,
  });

  const [oceans, cities] = await Promise.all([
    getImages(unsplash, "oceans"),
    getImages(unsplash, "city"),
  ]);
  return Promise.resolve({
    props: {
      oceans,
      cities,
    },
  });
};

export default function Home({ oceans, cities }: HomeProps) {
  return (
    <div className="h-full bg-top bg-cover overflow-auto">
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Image
        className="fixed top-0 left-0 z-0"
        src={bgImage}
        alt="backgroud-image"
        placeholder="blur"
      />
      <div className="fixed left-0 top-0 w-full h-full z-10 from-stone-900 bg-gradient-to-t"></div>

      <header className="fixed bg-stone-900 bg-opacity-80 top-0 w-full z-20 flex justify-between items-center h-[50px] px-10">
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <div className="text-transparent">hm</div> */}
        <div className="text-center">Photography Protfolio</div>
        <Link
          href="#"
          className="rounded-3xl bg-white text-stone-900 px-3 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>
      <main className="relative pt-[60px] z-20">
        <div className="flex flex-col items-center">
          <Tab.Group>
            <Tab.List className="flex items-center gap-8">
              {tabs.map((tab) => (
                <Tab key={tab.key} className="p-4">
                  {({ selected }) => (
                    <span
                      className={classNames(
                        "uppercase",
                        selected ? "text-white" : "text-stone-600"
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-[1700px] bg-stone-900 bg-opacity-20 max-w-[800px] w-full p-2 sm:p-4 my-6">
              <Tab.Panel>
                <Gallery photos={[...cities, ...oceans]} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={oceans} />
              </Tab.Panel>
              <Tab.Panel>
                <Gallery photos={cities} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className="relative h-[60px] flex justify-center uppercase text-lg font-medium z-20">
        Photography Protfolio
      </footer>
    </div>
  );
}

async function getImages(
  cli: ReturnType<typeof createApi>,
  query: string
): Promise<Photo[]> {
  const mappedPhotos: Photo[] = [];
  const photos = await cli.search.getPhotos({
    query,
  });

  if (photos.type === "success") {
    const photoArr = photos.response.results.map((photo) => ({
      src: photo.urls.full,
      thumb: photo.urls.thumb,
      width: photo.width,
      height: photo.height,
      alt: photo.alt_description ?? "image",
    }));

    const photosArrWithDataUrl: Photo[] = [];

    for (const photo of photoArr) {
      const blurDataUrl = await getDataUrl(photo.src);
      photosArrWithDataUrl.push({ ...photo, blurDataUrl });
    }
    mappedPhotos.push(...photosArrWithDataUrl);
  } else {
    console.log("could not get photos");
  }
  return mappedPhotos;
}

async function getDataUrl(url: string) {
  const imgData = await fetch(url);
  const arrayBufferData = await imgData.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return lqipData.metadata.dataURIBase64;
}
