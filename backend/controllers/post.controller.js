import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, "Unauthorized"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content are required"));
  }

  // Generate slug
  const slug = req.body.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  // Check for unique slug
  try {
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return next(errorHandler(400, "A post with this title already exists"));
    }

    console.log(req.body, req.user.id);
    const newPost = new Post({
      ...req.body,
      userId: req.user.id,
      slug,
    });

    // console.log(newPost);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Duplicate key error"));
    }
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  // Get all posts
  // Implement pagination
  // Implement filtering and sorting

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;

    const limit = parseInt(req.query.limit) || 9;

    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      // ...(req.query.title && { title: req.query.title }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: { $regex: req.query.searchTerm, $options: "i" },
          },
          {
            content: { $regex: req.query.searchTerm, $options: "i" },
          },
        ],
      }),
    })
      .sort({ updatedAt: sortOrder })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts: posts,
      totalPosts: totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this post")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    next(error);
  }
};


export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to update this post")
    );
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};