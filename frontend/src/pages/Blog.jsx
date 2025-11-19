// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="pt-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Events & Blog</h2>

      {/* Blog Posts List */}
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition"
            >
              {/* ✅ Show image if exists */}
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full h-80 object-contain rounded mb-4 "
                />
              )}

              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blog posts yet.</p>
      )}
    </div>
  );
}
