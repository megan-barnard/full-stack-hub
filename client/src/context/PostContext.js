import { createContext, useState } from "react";
// Generate random data for posts
import { faker } from '@faker-js/faker';

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [ currentPost, setCurrentPost ] = useState({ status: '', image: '', category: 'career' });
  const [ postLoading, setPostLoading ] = useState(false);
  const [ postError, setPostError ] = useState(null); 
  const [ postSuccess, setPostSuccess ] = useState(false); 

  const createNewPost = ({ authorId, category, status, image }) => {
    const post = randomPostData();
    console.log('post:', post);
    fetch("/api/new-post", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({ authorId, ...post }),
      // body: JSON.stringify({ authorId, category, status, image }),
    })
    .then(res => res.json())
    .then((data) => {
      setPostLoading(false);
      setPostSuccess(true);
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
    .then((data) => {
      console.log('liked:',data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  const commentOnPost = ({ authorId, category, status, image }) => {
    const post = randomPostData();
    console.log('post:', post);
    fetch("/api/new-post", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({ }),
    })
    .then(res => res.json())
    .then((data) => {
      setPostLoading(false);
      setPostSuccess(true);
    })
    .catch((error) => {
      setPostError(error.message);
      setPostLoading(false);
    });
  };

  return (
    <PostContext.Provider value={{ 
      currentPost, 
      setCurrentPost,
      postLoading, 
      setPostLoading,
      postError, 
      setPostError,
      postSuccess, 
      setPostSuccess,
      createNewPost,
      likePost,
      commentOnPost
    }}>
      {children}
    </PostContext.Provider>
  );
};

const randomPostData = () => {
  const posts = [
    {category: 'career', status: faker.hacker.ingverb(), image: faker.image.business() },
    {category: 'career', status: faker.finance.currencySymbol(), image: faker.image.city() },
    {category: 'career', status: `${faker.name.jobDescriptor()}, ${faker.name.jobDescriptor()}, ${faker.name.jobDescriptor()}`, image: '' },
    {category: 'career', status: `I'm now a ${faker.name.jobTitle()}!`, image: '' },
    {category: 'career', status: `${faker.name.jobDescriptor()} ${faker.name.jobArea()} ${faker.name.jobType()}`, image: '' },
    {category: 'career', status: faker.company.catchPhrase(), image: '' },
    
    {category: 'projects', status: faker.hacker.phrase(), image: faker.image.technics() },
    {category: 'projects', status: faker.hacker.phrase(), image: faker.image.technics() },
    {category: 'projects', status: faker.hacker.ingverb(), image: faker.image.abstract() },
    {category: 'projects', status: faker.hacker.phrase(), image: '' },
    {category: 'projects', status: `Working on a project for ${faker.company.companyName()}`, image: '' },
    
    {category: 'personal', status: `Just bought ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`, image: '' },
    {category: 'personal', status: faker.hacker.adjective(), image: faker.image.nightlife() }, 
    {category: 'personal', status: faker.hacker.adjective(), image: faker.image.cats() }, 
    {category: 'personal', status: faker.company.bs(), image: '' },
    {category: 'personal', status: faker.hacker.phrase(), image: '' },
  ];
  const postNumber = Math.floor(Math.random() * posts.length);
  return posts[postNumber];
};