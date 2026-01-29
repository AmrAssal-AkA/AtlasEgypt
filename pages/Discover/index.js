import Head from "next/head";
import Image from "next/image";
import { Bookmark, Star, Clock } from "lucide-react";
import { useRouter } from "next/router";

import Button from "../../components/ui/Button";

import { getAllDestination, getAllTours } from "@/helper/data-util";
import DestinationGrid from "@/components/Discover/Destination-grid";

export default function DestinationPage(props) {
  const { destinations } = props;
  const { tours } = props;

  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/Discover/${id}`);
  };

  return (
    <>
      <Head>
        <title>AtlasEgypt - Discover Egypt</title>
        <meta
          name="description"
          content="Explore the wonders of Egypt with AtlasEgypt. Discover top destinations and ready tours."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className=" mt-30 md:mt-50 px-5 md:px-0">
        <div className="max-w-7xl mx-auto mb-20">
          <h1 className="text-4xl font-bold px-5 mb-5">
            Explore Egypt wonder's
          </h1>
          <p className="text-md md:text-2xl md:leading-8 px-5 md:px-0 text-gray-700">
            Discover the magic of Egypt, from the ancient pyramids to the
            vibrant coral reefs. Our curated destinations offer a glimpse into
            the rich history and breathtaking landscapes of this extraordinary
            country.
          </p>
        </div>
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-4xl font-semibold text-center">
            Feature Distinations
          </h2>
          {/* Destination Cards */}
            <DestinationGrid destinations={destinations} handleClick={handleClick}/>
            </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const Destinations = await getAllDestination();
  return {
    props: {
      destinations: Destinations,
    },
    revalidate: 60
  };
}
