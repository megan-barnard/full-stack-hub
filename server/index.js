'use strict';

const express = require('express');
const morgan = require('morgan');

const {
  getHomePosts,
  getUserPosts,
  getPostById,
  newPost,
  deletePost,
  likePost,
  commentOnPost,
  deleteCommentOnPost
} = require('./controllers/postController');

const {
  getUsers,
  getUserById, 
  getUsersByIds,
  registerNewUser,
  updateUser,
  deleteUser,
  followUser
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
    .post("/api/new-post", newPost) // Create new post { authorId, category, status, image } 
    .post("/api/delete-post", deletePost) // Delete post
    .post("/api/like-post", likePost) // Like/unlike post
    .post("/api/comment-on-post", commentOnPost) // Comment on post 
    .post("/api/delete-comment", deleteCommentOnPost) // Delete comment on post 

    // Users
    .get("/api/get-users", getUsers) // Get users by limit  ...?lastVisibleId=LASTUSERID
    .get("/api/get-user/:uid", getUserById) // Get user by id
    .post("/api/get-users-by-ids", getUsersByIds) // Get users by ids
    .post("/api/new-user", registerNewUser) // Create new user { username, email, password }
    .post("/api/update-user/:uid", updateUser) // Update user { displayName, avatarSrc, bannerSrc, iconColor, bio, cohort, languages, websiteUrl, githubUrl, linkedinUrl, instagramUrl, facebookUrl }
    .post("/api/delete-user/:uid", deleteUser) // Delete user, not permanent, makes user active = false
    .post("/api/follow-user", followUser) // Follow/unfollow user

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

