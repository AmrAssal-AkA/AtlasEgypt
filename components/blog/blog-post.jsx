import Image from "next/image"

function BlogPost({ blog }) {
return (
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
  )
}

export default BlogPost