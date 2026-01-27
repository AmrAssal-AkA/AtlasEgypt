import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { MapPin, User, Compass, Clock } from "lucide-react";

import Button from "../components/ui/Button";
import { getFeaturedTours } from "@/helper/data-util";
import TourGrid from "@/components/Discover/Tour-grid";

export default function Home(props) {
  const { tours } = props;
  const router = useRouter();

  const handleClick = (Id) => {
    router.push(`/Discover/${Id}`);
  };
  return (
    <>
      <Head>
        <title>AtlasEgypt - Explore The Wonders of Egypt</title>
        <meta
          name="description"
          content="Discover the hidden gems of Egypt with AtlasEgypt. Book your unforgettable tour today!"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="mt-10">
        {/* Hero Section */}
        <section className="relative w-full">
          <Image
            src="/HeroPhoto.png"
            alt="Hero Photo refer to Egypt"
            fill
            className="object-cover object-top z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 flex flex-col items-center text-white px-4 py-32 md:py-40">
            <h1 className="text-3xl md:text-5xl font-bold text-center max-w-4xl mt-30 mb-20 ">
              Explore The wonders of egypt and the hidden gems with AtlasEgypt
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 md:pb-12 ">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-6xl mx-auto w-full">
              <form className="flex flex-col md:flex-row gap-10 items-center justify-center ">
                <div className="w-full md:w-auto flex items-center gap-3">
                  <label
                    htmlFor="FromLocation"
                    className="text-gray-700 font-semibold whitespace-nowrap"
                  >
                    From :
                  </label>
                  <select
                    id="FromLocation"
                    name="FromLocation"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:border-amber-500 w-full cursor-pointer"
                  >
                    <option value="">Select Origin</option>
                    <option value="france">France</option>
                    <option value="italy">Italy</option>
                    <option value="germany">Germany</option>
                    <option value="spain">Spain</option>
                  </select>
                </div>
                <div className="w-full md:w-auto flex items-center gap-2">
                  <label
                    htmlFor="ToLocation"
                    className="text-gray-700 font-semibold whitespace-nowrap"
                  >
                    TO :
                  </label>
                  <select
                    id="ToLocation"
                    name="ToLocation"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:border-amber-500 w-full cursor-pointer"
                  >
                    <option value="">Select Destination</option>
                    <option value="cairo">Cairo</option>
                    <option value="alexandria">Alexandria</option>
                    <option value="luxor">Luxor</option>
                    <option value="aswan">Aswan</option>
                  </select>
                </div>
                <div className="w-full md:w-auto flex items-center gap-2">
                  <label
                    htmlFor="TripType"
                    className="text-gray-700 font-semibold whitespace-nowrap"
                  >
                    Tour Type
                  </label>
                  <select
                    id="TripType"
                    name="TripType"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:border-amber-500 w-full cursor-pointer"
                  >
                    <option value="">Select Type</option>
                    <option value="regular">Regular Tour</option>
                    <option value="premium">Premium Tour</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </div>
                <Button>Book Now</Button>
              </form>
            </div>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section className="py-10 text-center">
          <h1 className="text-3xl font-bold">Why Choose AtlasEgypt </h1>
          <hr className="w-24 mx-auto my-4 border-amber-500" />
          <div className="grid grid-cols-1 gap-4 items-center justify-center md:grid-cols-3 max-w-8xl mx-auto px-4">
            <div className="rounded-2xl p-5 m-4 shadow-lg shadow-amber-500">
              <MapPin
                size={40}
                className="mx-auto mb-2 text-2xl text-gray-500"
              />
              <h2 className="text-2xl text-center mb-2 font-bold">
                Expert Guides
              </h2>
              <p className="text-xl ">
                Our guides are seasoned Egyptologists and local experts,
                providing deep insights into Egypt's history and culture.
              </p>
            </div>
            <div className="rounded-2xl p-5 m-4 shadow-md shadow-amber-500">
              <User size={40} className="mx-auto mb-2 text-2xl text-gray-500" />
              <h2 className="text-2xl text-center mb-2 font-bold">
                Personalized Itineraries
              </h2>
              <p className="text-xl">
                We tailor each trip to your interests and preferences, ensuring
                a unique and fulfilling adventure.
              </p>
            </div>
            <div className="rounded-2xl p-5 m-4 shadow-md shadow-amber-500">
              <Compass
                size={40}
                className="mx-auto mb-2 text-2xl text-gray-500"
              />
              <h2 className="text-2xl text-center mb-2 font-bold">
                Authentic Experiences
              </h2>
              <p className="text-xl">
                Immerse yourself in the real Egypt with exclusive access to
                hidden gems and local interactions.
              </p>
            </div>
          </div>
        </section>
        {/* Special Offer Section */}
        <section className="py-10 text-center bg-gray-500 ">
          <div className="grid grid-cols-2 items-center max-w-6xl gap-10 mx-auto px-4">
            <div className="flex flex-col items-center">
              <p className="text-xl md:text-2xl font-medium text-white mb-8 text-shadow-black">
                Have Your ultimate vecation and enjoy with the journey between
                the past and the future
              </p>
              <Button>Book Your Trip</Button>
            </div>
            <div className="flex flex-row gap-4 mt-4">
              <div className="relative w-1/2 h-64">
                <Image
                  src="/section3.jpg"
                  alt="Historical site in Egypt"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
              <div className="relative w-1/2 h-64">
                <Image
                  src="/section3(2).jpg"
                  alt="Simple life in Egypt"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Featured Trips Section */}
        <section className="py-10">
          <h3 className="text-4xl font-bold text-center">Featured Trips</h3>
          <hr className="w-24 mx-auto my-4 border-amber-500" />
          <TourGrid tours={tours} />
        </section>
        {/* About us Section */}
        <section className="py-10 text-center">
          <h1 className="text-3xl font-bold">About AtlasEgypt</h1>
          <hr className="w-24 mx-auto my-4 border-amber-500" />
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="text-left md:pr-8">
                <p className="text-xl text-gray-700">
                  AtlasEgypt is dedicated to providing exceptional travel experiences
                  in Egypt. Our team of experienced guides and travel experts
                  are passionate about sharing the rich history and culture of
                  this fascinating land. We offer a range of tours, from classic
                  itineraries to custom-designed adventures, ensuring a
                  memorable and enriching journey for every traveler.
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <Image
                  src="/AtlasEgypt.jpg"
                  alt="About Kemet"
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg shadow-amber-800"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const featuredTours = await getFeaturedTours();
  return {
    props: {
      tours: featuredTours,
    },
    revalidate: 1800,
  };
}
