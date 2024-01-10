import express from "express";
const router = express.Router();
import {
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  createPost,
} from "../controller/postController.js";

// Define your routes here
router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);

export default router;
