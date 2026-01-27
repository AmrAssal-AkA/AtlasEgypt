import Image from "next/image";
import Head from "next/head";

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
      <main className="mt-20 md:mt-24">
        <section className="relative w-full h-[40vh] md:h-[60vh]">
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
              Welcome to Our Blog
            </h1>
            <p className="text-lg md:text-xl max-w-4xl mb-5">
              Discover the latest news, tips, and insights about our services
              and the travel industry. Stay updated with our expert articles and
              guides to make the most of your travel experiences.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddBlog;
