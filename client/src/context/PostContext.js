import { createContext, useState } from "react";
import { storage } from "../firebase-config";
// Generate random data for posts
import { faker } from '@faker-js/faker';
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [ currentPost, setCurrentPost ] = useState({ status: '', link: '', image: '', category: 'career' });
  const [ postLoading, setPostLoading ] = useState(false);
  const [ postProgress, setPostProgress ] = useState(0);
  const [ postError, setPostError ] = useState(null); 
  const [ postSuccess, setPostSuccess ] = useState(false); 
  const [ commentStatus, setCommentStatus ] = useState({ success: false, postId: ''}); 

  const uploadPhoto = ({ authorId, category, status, link, image }) => {
    const imageType = image.type.split("/").pop().toLowerCase();
    const imageFileName = `${faker.datatype.uuid()}.${imageType}`;
    if (imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png') {
      setPostLoading(false);
      setPostError('Image must be a jpeg, jpg, or png.');
      return;
    }
    const storageRef = ref(storage, `/posts/${imageFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on("state_changed", 
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPostProgress(prog);
      }, 
      (error) => setPostError('Failed to upload photo'),
      () => getDownloadURL(uploadTask.snapshot.ref).then((url) => createNewPost({ authorId, category, status, link, image: url }))
    );
  };

  const createNewPost = ({ authorId, category, status, link, image }) => {
    // const post = randomPostData();
    fetch("/api/new-post", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      // body: JSON.stringify({ authorId, ...post }), // Used to generate random posts
      body: JSON.stringify({ authorId, category, status, link, image }),
    })
    .then(res => res.json())
    .then((data) => {
      setPostLoading(false);
      setPostSuccess(true);
      setCurrentPost({ status: '', link: '', image: '', category: 'career' })
    })
    .catch((error) => {
      setPostError(error.message);
      setPostLoading(false);
    });
  };

  const likePost = ({ postId, uid, like }) => {
    fetch("/api/like-post", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({ postId, uid, like }),
    })
    .then(res => res.json())
    .then((data) => {})
    .catch((error) => {});
  };

  const commentOnPost = ({ postId, uid, commentBody }) => {
    fetch("/api/comment-on-post", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({ postId, uid, commentBody }),
    })
    .then(res => res.json())
    .then((data) => {
      setCommentStatus({ success: true, postId }); 
    })
    .catch((error) => {});
  };

  return (
    <PostContext.Provider value={{ 
      currentPost, setCurrentPost,
      postLoading, setPostLoading,
      postProgress, setPostProgress,
      postError,  setPostError,
      postSuccess, setPostSuccess,
      commentStatus, setCommentStatus,
      uploadPhoto,
      createNewPost,
      likePost,
      commentOnPost
    }}>
      {children}
    </PostContext.Provider>
  );
};


// Used to generate random posts
// const randomPostData = () => {
//   const posts = [
//     {category: 'career', status: faker.hacker.ingverb(), link:'', image: faker.image.business(600, 400, true) },
//     {category: 'career', status: `${faker.name.jobDescriptor()} ${faker.name.jobDescriptor()}, ${faker.name.jobDescriptor()}`, link:'www.callme.com', image: '' },
//     {category: 'career', status: `I'm now a ${faker.name.jobTitle()}!`,link:'', image: '' },
//     {category: 'career', status: `${faker.name.jobDescriptor()} ${faker.name.jobArea()} ${faker.name.jobType()}`,link:'', image: '' },
//     {category: 'career', status: faker.company.catchPhrase(),link:'', image: '' },
//     {category: 'project', status: faker.hacker.phrase(),link:'', image:''},
//     {category: 'project', status: faker.hacker.phrase(),link:'', image: faker.image.technics(600, 400, true) },
//     {category: 'project', status: faker.hacker.ingverb(),link:'www.lookhere.com', image:'' },
//     {category: 'project', status: faker.hacker.phrase(),link:'', image: '' },
//     {category: 'project', status: `Working on a project for ${faker.company.companyName()}`,link:'', image: '' },
//     {category: 'personal', status: `Just bought ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`,link:'', image: '' },
//     {category: 'personal', status: faker.hacker.adjective(),link:'', image: faker.image.nightlife(600, 400, true) }, 
//     {category: 'personal', status: faker.hacker.adjective(),link:'', image: faker.image.cats(600, 400, true) }, 
//     {category: 'personal', status: faker.company.bs(),link:'www.mywebsite.com', image: '' },
//     {category: 'personal', status: faker.hacker.phrase(), link:'',image: '' },
//   ];
//   const postNumber = Math.floor(Math.random() * posts.length);
//   return posts[postNumber];
// };