import RegisterForm from "@/components/Authentication/Register-form";
import Head from "next/head";
import Image from "next/image";


export default function RegisterPage() {
  return (
    <>
    <Head>
      <title>AtlasEgypt - Register</title>
      <meta name="description" content="Create your AtlasEgypt account to start planning your dream trips, manage bookings, and access exclusive travel deals." />
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-20">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src={"/BlogPageBanner.jpg"}
            alt="Register Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Your Account
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-8"></div>
          <RegisterForm />
        </div>
      </div>
    </main>
    </>
  );
}
