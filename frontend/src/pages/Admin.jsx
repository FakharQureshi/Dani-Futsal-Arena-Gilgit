
import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); 

  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setContent("");
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error("Error adding post", error);
    }
  };

  // Fetch slots whenever date changes
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const formattedDate = date.toISOString().split("T")[0];
        const res = await axios.get(
          `http://localhost:5000/api/slots?date=${formattedDate}`
        );
        setSlots(res.data);
        setSelectedSlots([]);
      } catch (err) {
        console.error("Error fetching slots", err);
        setSlots([]);
      }
    };

    fetchSlots();
  }, [date]);

  // Toggle slot selection
  const toggleSlot = (time) => {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  // Save selected slots as available/unavailable
  const handleSaveSlots = async (status) => {
    if (selectedSlots.length < 1) {
      alert("Please select slots to update.");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];

    try {
      await axios.post("http://localhost:5000/api/slots", {
        date: formattedDate,
        times: selectedSlots,
        status, // "available" or "unavailable"
      });

      alert(`Slots marked as ${status}!`);
      setSelectedSlots([]);

      // Refresh slots after saving
      const res = await axios.get(
        `http://localhost:5000/api/slots?date=${formattedDate}`
      );
      setSlots(res.data);
    } catch (err) {
      console.error(`Error saving ${status} slots`, err);
    }
  };

  return (
    <div className="pt-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>

      {isAdmin && (
        <form
          onSubmit={handleAddPost}
          className="mb-12 p-6 rounded-lg shadow-md bg-gray-100 max-w-lg mx-auto"
          encType="multipart/form-data"
        >
          <h3 className="text-xl font-semibold mb-4">Add New Post</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            rows="4"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Post
          </button>
        </form>
      )}

      {isAdmin && (
        <div className="mb-12 p-6 rounded-lg shadow-md bg-gray-100 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Manage Slot Availability</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <Calendar onChange={setDate} value={date} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
              {slots.map((slot, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleSlot(slot.time)}
                  className={`cursor-pointer p-3 rounded-lg text-center shadow-md ${
                    selectedSlots.includes(slot.time)
                      ? "bg-yellow-500 text-white"
                      : slot.status === "available"
                      ? "bg-green-200"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {slot.time}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleSaveSlots("unavailable")}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save as Unavailable
            </button>
            <button
              onClick={() => handleSaveSlots("available")}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save as Available
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post._id} className="p-4 border rounded shadow-sm bg-white">
              <h4 className="text-lg font-bold">{post.title}</h4>
              <p className="mt-2">{post.content}</p>
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="mt-4 max-h-60 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
