import Head from "next/head";
import Image from "next/image";
import { Bookmark, Star, Clock } from "lucide-react";
import { useRouter } from "next/router";

import Button from "../../components/ui/Button";

import { getAllDestination, getAllTours } from "@/helper/data-util";

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
      </Head>
      <main className=" mt-50">
        <div className="max-w-7xl mx-auto mb-20">
          <h1 className="text-4xl font-bold px-5 mb-5">
            Explore Egypt wonder's
          </h1>
          <p className="text-xl font-medium">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10  px-5">
            {destinations.map((destination) => {
              return (
                <div
                  key={destination.id}
                  className=" rounded-lg shadow-xl overflow-hidden"
                >
                  {/* Destination Card */}
                  <div className="relative w-full h-48">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Card Content */}
                  <div className="relative p-4">
                    <h3 className="text-2xl font-bold mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <Bookmark className="inline-block mb-2 mr-2 text-orange-400" />
                      <p className="text-gray-600 mb-2">
                        {destination.category}
                      </p>
                    </div>
                    {/* Rating and Description */}
                    <div className="absolute top-2 right-2 flex items-center">
                      <Star className="mr-1 fill-yellow-500 border-yellow-500" />
                      <p> {destination.rating}</p>
                    </div>
                    <p className="text-gray-700 mb-4">
                      {destination.description}
                    </p>
                    <Button onClick={() => handleClick(destination.id)}>
                      Learn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Tours Section */}
        <div className=" justify-center mb-20">
          <h2 className="text-4xl font-semibold text-center">
            Related Ready Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto px-4">
            {tours.map((tour) => (
              <div
                key={tour.tourId}
                className="rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-center"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-2xl font-bold mb-2">{tour.title}</h4>
                  <p className="text-gray-600 flex items-center mt-1">
                    <Clock size={16} className="mr-1 text-amber-500" />
                    {tour.duration}
                  </p>
                  <p className="text-xl ">{tour.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-amber-600 font-bold text-xl">
                      {tour.price} EGP
                    </span>
                    <Button onClick={() => handleClick(tour.tourId)}>
                      View Tour
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const Destinations = await getAllDestination();
  const Tours = await getAllTours();
  return {
    props: {
      destinations: Destinations,
      tours: Tours,
    },
    revalidate: 1800,
  };
}
