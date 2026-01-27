import BlogPost from "./blog-post";

function BlogGrid(props) {
  const { blogs } = props;

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {blogs.map((blog) => (
        <BlogPost key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}

export default BlogGrid;
