// import Post from "../models/post.model.js";
// import { errorHandler } from "../utils/error.js";

// export const createPost = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, " Unauthorized"));
//   }

//   if (!req.body.title || !req.body.content) {
//     return next(errorHandler(400, "Title and content are required"));
//   }
//   console.log(req.body.title, req.body.content);

//   // const slug = req.body.title
//   //   .split(" ")
//   //   .join("-")
//   //   .toLowerCase()
//   //   .replace(/[^a-zA-Z0-9]/g, "");
//   // console.log(slug);
//   console.log({...req.body});

//   const newPost = new Post({
//     ...req.body,
//     userId: req.user.id,
//   });

//   try {
//     console.log(newPost);

//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (error) {
//     next(error);
//   }
// };

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

    console.log(req.body,req.user.id);
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
