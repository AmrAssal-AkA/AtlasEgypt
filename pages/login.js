import LoginForm from "@/components/Authentication/login-form";
import Head from "next/head";
import Image from "next/image";

export default function loginPage() {
  return (
    <>
    <Head>
      <title>AtlasEgypt - Login</title>
      <meta name="description" content="Login to your AtlasEgypt account to manage your bookings, explore exclusive offers, and access personalized travel experiences." />
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src={"/BrandBanner.png"}
            alt="Login Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Login to Your Account
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-8"></div>
          <LoginForm />
        </div>
      </div>
    </main>
    </>
  );
}
