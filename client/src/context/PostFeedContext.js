import { createContext, useState } from "react";

export const PostFeedContext = createContext(null);

export const PostFeedProvider = ({ children }) => {
  const [ userDetails, setUserDetails ] = useState('');
  const [ userDetailsLoading, setUserDetailsLoading ] = useState(false);
  const [ postFeed, setPostFeed ] = useState([]);
  const [ postFeedLoading, setPostFeedLoading ] = useState(false);
  const [ postError, setPostError ] = useState('');

  const [ sortPostsCategory, setSortPostsCategory ] = useState('all');

  const getHomeFeed = () => {
    setPostFeedLoading(true);
    fetch('/api/get-home-posts')
    .then(res => res.json())
    .then(({data}) => {
      if (data.length) {
        console.log('test1');
        setPostFeed(data);
      } else {
        console.log('test2');
        setPostFeed(data);
      }
      console.log('getHomePostFeed:', data);
      setPostFeedLoading(false);
    })
    .catch((error) => {
      console.log('error getHomePostFeed:', error);
      setPostError(error.message);
      setPostFeedLoading(false);
    });
  };
  
  const getProfileFeed = (userId) => {
    setUserDetailsLoading(true);
    fetch(`/api/get-user/${userId}`)
    .then(res => res.json())
    .then(({data}) => {
      console.log('getProfileFeed:', data);
      setUserDetails(data);
      if (data.postIds && data.postIds.length) {
        getUserFeed(userId)
      } else {
        setPostFeed([]);
      }
      setUserDetailsLoading(false);
    })
    .catch((error) => {
      console.log('error getProfileFeed:', error);
      setPostError(error.message);
      setUserDetailsLoading(false);
    });
  };

  const getUserFeed = (userId) => {
    fetch(`/api/get-user-posts/${userId}`)
    .then(res => res.json())
    .then(({data}) => {
      console.log('getUserFeed:', data);
      setPostFeed(data);
      setPostFeedLoading(false);
    })
    .catch((error) => {
      console.log('error getUserFeed:', error);
      setPostError(error.message);
      setPostFeedLoading(false);
    });
  };

	return (
		<PostFeedContext.Provider value={{ 
      userDetails,
      userDetailsLoading,
      postFeed,
      postFeedLoading, 
      postError, 
      sortPostsCategory,
      setSortPostsCategory,
      setPostError, 
      getHomeFeed,
      getProfileFeed
    }}>
			{children}
		</PostFeedContext.Provider>
	);
};