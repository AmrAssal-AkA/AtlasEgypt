import Image from "next/image";
import Head from "next/head";

import Button from "@/components/ui/Button";
import { getBlogs } from "@/data/data";

export default function BlogPage() {
  const blogs = getBlogs();
  return (
    <>
    <Head>
      <title>AtlasEgypt - Blog</title>
      <meta name="description" content="Stay updated with the latest news, tips, and insights from AtlasEgypt. Explore our blog for expert articles and travel guides." />
    </Head>
    <main className="mt-20 md:mt-24">
      <section className="relative w-full h-[40vh] md:h-[60vh]">
        <Image
          src="/BlogPageBanner.jpg"
          alt="Blog Page Banner"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center ">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Our Blog
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mb-5">
            Discover the latest news, tips, and insights about our services and
            the travel industry. Stay updated with our expert articles and
            guides to make the most of your travel experiences.
          </p>
          <Button className="hover:text-white">Add Post</Button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center px-4 pt-4 space-x-4">
                <p className="text-sm text-gray-500 mb-2">{blog.publishedAt}</p>
                <div className="border-l h-4 border-gray-500 mb-2"></div>
                <p className="text-sm text-gray-500 mb-2">{blog.author}</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-4">{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
