import Button from "../ui/Button";

function AddPostBlog() {
  return (
    <section className="mt-20">
      <div className="container mx-auto mt-10">
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="text-2xl font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full p-2 border border-gray-300 rounded h-12"
              placeholder="Enter Blog title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="text-2xl font-bold">
              Content
            </label>
            <textarea
              id="content"
              rows={8}
              name="content"
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Blog content"
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="text-2xl font-bold mb-2 block">
              Upload Image
            </label>
            <button className="mb-4 py-2 bg-gray-600 text-white rounded hover:bg-amber-600 transition-colors cursor-pointer">
              <input type="file" id="image" name="image" accept="image/*" />
            </button>
          </div>

          <div className="text-center">
            <Button type="submit" className="mx-auto block w-full md:w-1/2 py-3 text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              Add Blog Post
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddPostBlog;
