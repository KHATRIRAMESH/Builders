import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, " Unauthorized"));
  }

  if (!req.body.title || req.body.content) {
    return next(errorHandler(400, "Title and content are required"));
  }

  const newPost = new Post({
    ...req.body,
    userId: req.user.id,
  });
    
    try {

        const savedPost = await newPost.save();
        res.status(201).json({
            message: "Post created successfully",
            post: savedPost,
        });
        
    } catch (error) {
        next(error)
    }
};
