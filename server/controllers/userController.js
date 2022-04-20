"use strict";

const { db, arrayUnion, timestamp, documentId } = require("../util/firebase");

// Get all users. /api/get-users?lastVisibleId=LASTUSERID
const getUsers = async (req, res) => {
  const { lastVisibleId } = req.query;
  const limit = 25;
  try {
    const lastUserRef = lastVisibleId ? await db.collection('users').doc(lastVisibleId).get() : '';
    const query =  lastUserRef ? 
      await db.collection("users").orderBy(documentId()).startAfter(lastUserRef).limit(limit).get(): 
      await db.collection("users").orderBy(documentId()).limit(limit).get();
    const result = query.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
    result && result.length ?
      res.status(200).json({ status: 200, data: result, message: "Users received" }):
      res.status(200).json({ status: 200, data: [], message: "No users found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Find a user by id: /api/get-user/:uid
const getUserById = async (req, res) => {
  const { uid } = req.params;
  try {
    const query = await db.collection("users").doc(uid).get();
    const result = { id: query.id, ...query.data()};
    result ?
      res.status(200).json({ status: 200, data: result, message: "User found" }):
      res.status(404).json({ status: 404, message: "No user found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Get users by ids: /api/get-users-by-ids
const getUsersByIds = async (req, res) => {
  const { userIds } = req.body;
  try {
    let result = [];
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      const query = await db.collection("users").doc(userId).get();
      const user = { id: query.id, ...query.data()};
      result[i] = { id: user.id, avatarSrc: user.profile.avatarSrc, username: user.username, displayName: user.profile.displayName };
    }
    (result && result.length) ?
    res.status(200).json({ status: 200, data: result, message: "Users found" }):
    res.status(404).json({ status: 404, data: [], message: "No users found" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Register a new user
const registerNewUser = async (req, res) => {
  const { name, username, email, uid } = req.body;
  try {
    const joined = timestamp();
    // Create random users
    // await db.collection("users").doc(uid).set({ email, username, "profile": { joined, displayName: name, avatarSrc:additionalData.avatarSrc, bannerSrc:additionalData.bannerSrc, iconColor:additionalData.color, bio:additionalData.bio, cohort:additionalData.cohort, languages:additionalData.languages, websiteUrl:additionalData.websiteUrl, githubUrl:additionalData.githubUrl, linkedinUrl:additionalData.linkedinUrl, instagramUrl:additionalData.instagramUrl, facebookUrl:additionalData.facebookUrl }, followingIds:[], followerIds:[], postIds:[] });
    await db.collection("users").doc(uid).set({ email, username, "profile": { joined, displayName: name, avatarSrc:"https://firebasestorage.googleapis.com/v0/b/full-stack-hub-social-media.appspot.com/o/avatars%2Favatar.jpg?alt=media&token=43865ad9-76f3-444c-b9c2-2ed1ed65e64e", bannerSrc:"https://firebasestorage.googleapis.com/v0/b/full-stack-hub-social-media.appspot.com/o/banners%2Fbanner.jpg?alt=media&token=228cebb1-d43a-4f83-8c5a-589eef4932e7", iconColor:"#000", bio:"", cohort:"", languages:"", websiteUrl:"", githubUrl:"", linkedinUrl:"", instagramUrl:"", facebookUrl:"" }, followingIds:[], followerIds:[], postIds:[] });
    const user = await db.collection("users").doc(uid).get();
    res.status(200).json({ status: 200, user, message: "User created" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Update user: /api/update-user/:uid
const updateUser = async (req, res) => {
  const { displayName, avatarSrc, bannerSrc, iconColor, bio, cohort, languages, websiteUrl, githubUrl, linkedinUrl, instagramUrl, facebookUrl } = req.body;
  const { uid } = req.params;
  try {
    await db.collection("users").doc(uid).update({ "profile.displayName": displayName, "profile.avatarSrc":avatarSrc, "profile.bannerSrc":bannerSrc, "profile.iconColor":iconColor, "profile.bio":bio,"profile.cohort":cohort, "profile.languages":languages, "profile.websiteUrl":websiteUrl, "profile.githubUrl":githubUrl, "profile.linkedinUrl":linkedinUrl, "profile.instagramUrl":instagramUrl, "profile.facebookUrl":facebookUrl});
    const result = await db.collection("users").doc(uid).get();
    res.status(200).json({ status: 200, data: result, message: "User updated" })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Delete user: /api/delete-user/:uid
const deleteUser = async (req, res) => {
  const { uid } = req.params;
  try {
    await db.collection("users").doc(uid).update({ "active": false });
    res.status(200).json({ status: 200, message: "User deleted" })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Follow/unfollow user: /api/follow-user
const followUser = async (req, res) => {
  const { uid, followId, followerState } = req.body;
  try {
    if (followerState) {
      await db.collection("users").doc(uid).update({followingIds: arrayUnion(followId)});
      await db.collection("users").doc(followId).update({followerIds: arrayUnion(uid)});
    } else {
      const queryUid = await db.collection("users").doc(uid).get();
      const userUid = { id: queryUid.id, ...queryUid.data()};
      const updatedUid = userUid.followingIds.filter((follower) => follower !== followId);
      await db.collection("users").doc(uid).update({ followingIds: updatedUid});
      
      const queryFollowId = await db.collection("users").doc(followId).get();
      const userFollowId = { id: queryFollowId.id, ...queryFollowId.data()};
      const updatedFollowId = userFollowId.followerIds.filter((follower) => follower !== uid);
      await db.collection("users").doc(followId).update({ followerIds: updatedFollowId});
    }
    res.status(200).json({ status: 200, message: `User ${followerState ? 'followed' : 'unfollowed'}` })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUsersByIds,
  registerNewUser,
  updateUser,
  deleteUser,
  followUser
};
