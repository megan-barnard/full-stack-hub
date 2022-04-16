"use strict";

const { db, arrayUnion, timestamp} = require("../util/firebase");

// Get homepage posts by limit, start after the last visible post. /api/get-home-posts?lastVisibleId=LASTPOSTID
const getHomePosts = async (req, res) => {
  const { lastVisibleId } = req.query;
  const limit = 25;
  try {
    const lastPostRef = lastVisibleId ? await db.collection('posts').doc(lastVisibleId).get() : '';
    const query = await db.collection("posts").orderBy('createdAt', 'desc').startAfter(lastPostRef).limit(limit).get();
    const result = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    result && result.length ?
      res.status(200).json({ status: 200, data: result, message: "Posts received" }):
      res.status(404).json({ status: 404, message: "No posts found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Get posts by user id: /api/get-posts/:userId?lastVisibleId=LASTPOSTID
const getUserPosts = async (req, res) => {
  const { lastVisibleId } = req.query; 
  const { userId } = req.params;
  const limit = 25;
  try {
    const query = await db.collection("posts").where("authorId", "==", userId).get();
    const result = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    result.sort(function(a, b) {
      let keyA = a.createdAt.toDate();
      let keyB = b.createdAt.toDate();
      return keyA > keyB ? -1 : (keyA < keyB ? 1 : 0);
    });
    let lastVisibleIndex = lastVisibleId ? (result.findIndex(post => post.id === lastVisibleId))+1 : 0;
    let posts = result.slice(lastVisibleIndex, lastVisibleIndex+limit);
    posts && posts.length ?
      res.status(200).json({ status: 200, data: posts, message: "Posts received" }):
      res.status(404).json({ status: 404, message: "No posts found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Find a post by id: /api/get-post/:postId
const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const query = await db.collection("posts").get(postId);
    const result = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    result ?
      res.status(200).json({ status: 200, data: result[0], message: "Post found" }):
      res.status(404).json({ status: 404, message: "No post found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Create a new post: /api/new-post
const newPost = async (req, res) => {
  const { authorId, category, status, image } = req.body;
  try {
    const newPost = await db.collection("posts").add({ authorId, category, status, image, createdAt: timestamp(), comments: [], likedBy: [] });
    await db.collection("users").doc(authorId).update({ postIds: arrayUnion(newPost.id)});
    res.status(200).json({ status: 200, message: "Posted" })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Delete post: /api/delete-post/:postId
const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    await db.collection("posts").doc(postId).delete();
    res.status(200).json({ status: 200, message: "Post deleted" })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

  module.exports = {
    getHomePosts,
    getUserPosts,
    getPostById,
    newPost,
    deletePost
};
