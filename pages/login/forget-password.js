import ForgetPasswordForm from "@/components/Authentication/forget-password-form";
import Head from "next/head";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function ForgetPassword() {
  return (
    <>
      <Head>
        <title>AtlasEgypt - Change Password</title>
        <meta
          name="description"
          content="Change your AtlasEgypt account password."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-60 md:h-auto">
            <Image
              src="/AtlasEgypt.jpg"
              alt="Login Banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-2">
              Change Password
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mb-8"></div>
            <ForgetPasswordForm />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
