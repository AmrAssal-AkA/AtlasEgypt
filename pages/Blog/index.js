import Image from "next/image";
import Head from "next/head";

import Button from "@/components/ui/Button";
import { getBlogs } from "@/data/data";
import BlogGrid from "@/components/blog/blog-grid";
import { useRouter } from "next/router";

export default function BlogPage() {
  const blogs = getBlogs();
  const router = useRouter();

  const handleAddBlog =() =>{
    router.push('/Blog/AddBlog');
  }
  return (
    <>
    <Head>
      <title>AtlasEgypt - Blog</title>
      <meta name="description" content="Stay updated with the latest news, tips, and insights from AtlasEgypt. Explore our blog for expert articles and travel guides." />
      <meta name="robots" content="index, nofollow" />
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
          <Button className="hover:text-white" onClick={handleAddBlog}>Add Post</Button>
        </div>
      </section>
    <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl text-center">Latest Blog Posts</h2>
        <BlogGrid blogs={blogs} />
        </section>
    </main>
    </>
  );
}
