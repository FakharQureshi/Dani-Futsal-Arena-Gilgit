import express from "express";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // saves in /uploads
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname) // unique name
    );
  },
});

const upload = multer({ storage });


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({ title, content, image });
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error creating post", error: err });
  }
});

//Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err });
  }
});

export default router;
