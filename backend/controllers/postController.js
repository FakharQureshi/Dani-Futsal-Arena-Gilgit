import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const newPost = new Post({ title, content, image });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
