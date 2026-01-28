import Head from "next/head";
import Image from "next/image";
import React, { Fragment } from "react";
import { Star, Bookmark , CircleDollarSign } from "lucide-react";

import { getDestinationById, getAllDestination } from "@/helper/data-util";
import Button from "@/components/ui/Button";
function TripDetailPage(props) {
  const destinationDetails = props.DestinationDetails;

  if (!destinationDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Head>
        <title>AtlasEgypt - {destinationDetails.name}</title>
        <meta name="description" content={destinationDetails.description} />
      </Head>
      <main className="mt-20 md:min-h-screen p-4">
        <section className="max-w-7xl mx-auto">
          <div className="bg-gray-100 relative rounded-lg overflow-hidden">
            <Image
              src={destinationDetails.image}
              alt={destinationDetails.name}
              width={300}
              height={150}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 md:pb-15 bg-white bg-opacity-50 shadow-amber-500">
                <h1 className="text-3xl md:text-5xl font-bold text-black mt-2">
                  {destinationDetails.name}
                </h1>
                  <div>
                  <Bookmark className="inline-block mt-2 mb-2 mr-2 text-orange-500" />
                  <p className="text-gray-600 mb-2 inline-block">{destinationDetails.category}</p>
                  </div>
                <div className="absolute top-2 right-2 flex items-center">
                  <Star className="mr-1 fill-yellow-500 border-yellow-500" />
                  <p> {destinationDetails.rating}</p>
                </div>
                <div className="absolute top-2 right-2 flex items-center my-10">

                <CircleDollarSign className="mr-1 w-6 h-6 fill-amber-500 border-amber-500" />
                  <p className="mr-5 text-2xl font-bold"> {destinationDetails.price}</p>
                <Button className="mt-4">Book Now</Button>
                </div>
            </div>
          </div>

          <div className="my-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">About {destinationDetails.name}</h2>
            <p className="text-gray-700 text-lg md:text-xl">
              {destinationDetails.description}
            </p>

            <table className="w-full mt-8 table-auto border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-2xl">Includes</td>
                  <td className="border border-gray-300 px-4 py-2 text-xl">{destinationDetails.Includes}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-2xl">Best Time to Visit</td>
                  <td className="border border-gray-300 px-4 py-2 text-xl">{destinationDetails.BestTimeToVisit}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-2xl">Attractions</td>
                  <td className="border border-gray-300 px-4 py-2 text-xl">{destinationDetails.Attractions}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold text-2xl">Activities</td>
                  <td className="border border-gray-300 px-4 py-2 text-xl">{destinationDetails.Activities}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { Id } = params;

  const destination = await getDestinationById(Id);

  return {
    props: {
      DestinationDetails: destination,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const destinations = await getAllDestination();

  const paths = destinations.map((destination) => ({
    params: { Id: destination.id },
  }));
  return {
    paths: paths,
    fallback: true,
  };
}

export default TripDetailPage;
