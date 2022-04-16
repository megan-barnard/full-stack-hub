'use strict';

const express = require('express');
const morgan = require('morgan');
const authMiddleware = require("./util/authMiddleware");

const {
  getHomePosts,
  getUserPosts,
  getPostById,
  newPost,
  deletePost
  // getPostsByCategory,
} = require('./controllers/postController');

const {
  getUsers,
  getUserById, 
  registerNewUser,
  updateUser,
  deleteUser
} = require('./controllers/userController');

express()
    .use(morgan("tiny"))
    .use(express.json())
    .use(express.static("public"))
    // ---------------------------------
    // Posts
    .get("/api/get-home-posts", getHomePosts) // Get posts by limit  ...?lastVisibleId=LASTPOSTID
    .get("/api/get-user-posts/:uid", getUserPosts) // Get posts by user id  ...?lastVisibleId=LASTPOSTID
    .get("/api/get-post/:postId", getPostById) // Get post by id
    .post("/api/new-post", authMiddleware, newPost) // Create new post { authorId, category, status, image } 
    .post("/api/delete-post", authMiddleware, deletePost) // Delete post

    // Users
    .get("/api/get-users", getUsers) // Get users by limit  ...?lastVisibleId=LASTUSERID
    .get("/api/get-user/:uid", getUserById) // Get user by id
    .post("/api/new-user", registerNewUser) // Create new user { username, email, password }
    .patch("/api/update-user/:uid", authMiddleware, updateUser) // Update user { displayName, avatarSrc, bannerSrc, iconColor, bio, languages, websiteUrl, githubUrl, linkedinUrl, instagramUrl, facebookUrl }
    .post("/api/delete-user/:uid", authMiddleware, deleteUser) // Delete user, not permanent, makes user active = false
    // ---------------------------------
    // catch all endpoint
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins server and sets it to listen on port 4000
    .listen(4000, () => console.log(`Listening on port 4000`));









































// const {
//   getPostsByDate,
//   getPostsByCategory,
// } = require('./handlers/searchHandlers');

// const {
//   getUsers,
//   getUserById,
//   getUserPosts,  
// } = require('./handlers/userHandlers');

// const {
//   getPostById,
//   getPostsByIds,
//   getPostsForHomefeed,
//   getPostsByuid
//   // createPost,
// } = require('./handlers/postHandlers');

