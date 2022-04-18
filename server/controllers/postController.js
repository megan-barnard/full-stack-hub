"use strict";

const { db, arrayUnion, timestamp} = require("../util/firebase");

const addUsersToPosts = async (posts) => {
  try {
    for (let i = 0; i < posts.length; i++) {
      const authorId = posts[i].authorId;
      const result = await db.collection("users").doc(authorId).get();
      const user = { id: result.id, ...result.data()};
      posts[i].user = { id: user.id, avatarSrc: user.profile.avatarSrc, username: user.username, displayName: user.profile.displayName };
    }
    return posts;
  } catch(error) {
    return posts;
  }
};

// Get homepage posts by limit, start after the last visible post. /api/get-home-posts?lastVisibleId=LASTPOSTID
const getHomePosts = async (req, res) => {
  const { lastVisibleId } = req.query;
  const limit = 25;
  try {
    const lastPostRef = lastVisibleId ? await db.collection('posts').doc(lastVisibleId).get() : '';
    const query = await db.collection("posts").orderBy('createdAt', 'desc').startAfter(lastPostRef).limit(limit).get();
    const posts = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    const result = await addUsersToPosts(posts);
    result && result.length ?
      res.status(200).json({ status: 200, data: result, message: "Posts received" }):
      res.status(200).json({ status: 200, data: [], message: "No posts found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Get posts by user id: /api/get-posts/:uid?lastVisibleId=LASTPOSTID
const getUserPosts = async (req, res) => {
  const { lastVisibleId } = req.query; 
  const { uid } = req.params;
  const limit = 25;
  try {
    const query = await db.collection("posts").where("authorId", "==", uid).get();
  
    const userQuery = await db.collection("users").doc(uid).get();
    const user = { id: userQuery.id, ...userQuery.data()};
    const formatedUser = { id: user.id, avatarSrc: user.profile.avatarSrc, username: user.username, displayName: user.profile.displayName };
    const result = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), user: formatedUser }));
    result.sort(function(a, b) {
      let keyA = a.createdAt.toDate();
      let keyB = b.createdAt.toDate();
      return keyA > keyB ? -1 : (keyA < keyB ? 1 : 0);
    });
    let lastVisibleIndex = lastVisibleId ? (result.findIndex(post => post.id === lastVisibleId))+1 : 0;
    let posts = result.slice(lastVisibleIndex, lastVisibleIndex+limit);
    posts && posts.length ?
      res.status(200).json({ status: 200, data: posts, message: "Posts received" }):
      res.status(200).json({ status: 200, data: [], message: "No posts found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Find a post by id: /api/get-post/:postId
const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const query = await db.collection("posts").get(postId);
    const post = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    const result = await addUsersToPosts(post);
    result ?
      res.status(200).json({ status: 200, data: result[0], message: "Post found" }):
      res.status(200).json({ status: 200, data: [], message: "No post found" });
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

// Find a post by id: /api/get-post/:postId
const likePost = async (req, res) => {
  const { postId, uid, like } = req.body;
  try {
    if (like) {
      await db.collection("posts").doc(postId).update({ likedBy: arrayUnion(uid)});
    } else {
      console.log('testinside');
      const query = await db.collection("posts").doc(postId).get();
      const post = { id: query.id, ...query.data()};
      const updatedLikes = post.likedBy.filter((like) => like !== uid);
      await db.collection("posts").doc(postId).update({ likedBy: updatedLikes});
    }
    res.status(200).json({ status: 200, message: `Post ${like ? 'liked' : 'unliked'}` });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Find a post by id: /api/get-post/:postId
const commentOnPost = async (req, res) => {
  const { postId } = req.body;
  try {
    const query = await db.collection("posts").get(postId);
    const post = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    const result = await addUsersToPosts(post);
    result ?
      res.status(200).json({ status: 200, data: result[0], message: "Post found" }):
      res.status(200).json({ status: 200, data: [], message: "No post found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

  module.exports = {
    getHomePosts,
    getUserPosts,
    getPostById,
    newPost,
    deletePost,
    likePost,
    commentOnPost
};
