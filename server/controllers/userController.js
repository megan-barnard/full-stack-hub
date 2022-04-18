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
      res.status(404).json({ status: 404, message: "No users found" });
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

const registerNewUser = async (req, res) => {
  const { name, username, email, uid, additionalData } = req.body;
  try {
    const joined = timestamp();

    // const userRef = await db.collection('users').get();
    // let followerList = userRef.docs.map((doc) => (doc.id));
    // let followers = [];
    // let following = [];
    
    // for (let i = 0; i < followerList.length; i++){
    //   let followerAddRemove = Math.floor(Math.random() * 2);
    //   console.log('test',followerAddRemove);
    //   if (followerAddRemove) followers.push(followerList[i]);
    // }
    // for (let i = 0; i < followerList.length; i++){
    //   let followingAddRemove = Math.floor(Math.random() * 2);
    //   console.log('test',followingAddRemove);
    //   if (followingAddRemove) following.push(followerList[i]);
    // }


    await db.collection("users").doc(uid).set({ email, username, "profile": { joined, displayName: name, avatarSrc:additionalData.avatarSrc, bannerSrc:additionalData.bannerSrc, iconColor:additionalData.color, bio:additionalData.bio, languages:additionalData.languages, websiteUrl:additionalData.websiteUrl, githubUrl:additionalData.githubUrl, linkedinUrl:additionalData.linkedinUrl, instagramUrl:additionalData.instagramUrl, facebookUrl:additionalData.facebookUrl }, 
    followingIds:[], followerIds:[], commentIds:[], postIds:[] });
    // await db.collection("users").doc(uid).set({ email, username, "profile": { joined, displayName: name, avatarSrc:"", bannerSrc:"", iconColor:"#000", bio:"", languages:"", websiteUrl:"", githubUrl:"", linkedinUrl:"", instagramUrl:"", facebookUrl:"" }, followingIds:[], followerIds:[], commentIds:[], postIds:[] });
    const user = await db.collection("users").doc(uid).get();
    res.status(200).json({ status: 200, user, message: "User created" });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

// Update user: /api/update-user/:uid
const updateUser = async (req, res) => {
  const { displayName, avatarSrc, bannerSrc, iconColor, bio, languages, websiteUrl, githubUrl, linkedinUrl, instagramUrl, facebookUrl } = req.body;
  const { uid } = req.params;
  try {
    await db.collection("users").doc(uid).update({ "profile.displayName": displayName, "profile.avatarSrc":avatarSrc, "profile.bannerSrc":bannerSrc, "profile.iconColor":iconColor, "profile.bio":bio, "profile.languages":languages, "profile.websiteUrl":websiteUrl, "profile.githubUrl":githubUrl, "profile.linkedinUrl":linkedinUrl, "profile.instagramUrl":instagramUrl, "profile.facebookUrl":facebookUrl});
    res.status(200).json({ status: 200, message: "User updated" })
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

const followUser = async (req, res) => {
  const { uid, followId, followerState } = req.body;
  try {
    if (followerState === 'unfollowed') {
      await db.collection("users").doc(uid).update({followingIds: FieldValue.arrayRemove(followId)});
      await db.collection("users").doc(followId).update({followerIds: FieldValue.arrayRemove(uid)});
    } else {
      await db.collection("users").doc(uid).update({followingIds: FieldValue.arrayUnion(followId)});
      await db.collection("users").doc(followId).update({followerIds: FieldValue.arrayUnion(uid)});
    }
    res.status(200).json({ status: 200, message: `User ${followerState}` })
  } catch (error) {
    res.status(500).json({ status: 500, message: "Server error..." });
  }
};

module.exports = {
  getUsers,
  getUserById,
  registerNewUser,
  updateUser,
  deleteUser,
  followUser
};
