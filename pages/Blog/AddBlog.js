import Image from "next/image";
import Head from "next/head";
import { getSession } from "next-auth/react";

import AddPostBlog from "@/components/blog/Post-blog";


function AddBlog() {
  return (
    <>
      <Head>
        <title>AtlasEgypt - Add Blog</title>
        <meta
          name="description"
          content="Add a new blog post to share your insights and updates with the AtlasEgypt community."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="mt-20 md:min-h-screen">
        <section className="relative w-full h-[30vh] md:h-[55vh]">
          <Image
            src="/BlogPageBanner.jpg"
            alt="Blog Page Banner"
            fill
            className="object-cover object-center z-0"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center ">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Adding a New Blog Post
            </h1>
            <p className="text-lg md:text-xl max-w-4xl mb-5">
              Share your insights, experiences, and updates with the AtlasEgypt
              community by adding a new blog post. Whether it's a travel story,
              a cultural insight, or an update about our services, your
              contribution helps us connect and inspire others. Use the form
              below to create your blog post and share it with the world!
            </p>
          </div>
        </section>
        <AddPostBlog />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
}


export default AddBlog;
