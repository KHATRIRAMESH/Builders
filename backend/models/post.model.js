import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://static-web.grammarly.com/1e6ajr2k4140/5Xx2WQPJ2OZejMVhlZA84X/3f460fd0a7c5b7a21040d795480b260e/Frame_31613475_1.png?w=356",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", { postSchema });

export default Post;
