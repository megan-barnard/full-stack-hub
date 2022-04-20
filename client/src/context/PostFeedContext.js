import { createContext, useState } from "react";

export const PostFeedContext = createContext(null);

export const PostFeedProvider = ({ children }) => {
  const [ userDetails, setUserDetails ] = useState('');
  const [ userDetailsLoading, setUserDetailsLoading ] = useState(false);
  const [ postFeed, setPostFeed ] = useState([]);
  const [ postFeedLoading, setPostFeedLoading ] = useState(false);
  const [ singlePost, setSinglePost ] = useState({});
  const [ singlePostLoading, setSinglePostLoading ] = useState(false);
  const [ postError, setPostError ] = useState('');
  const [ sortPostsCategory, setSortPostsCategory ] = useState('all');

  const getHomeFeed = ({ lastPostId }) => {
    setPostFeedLoading(true);
    const homefeedQuery = lastPostId ? `/api/get-home-posts?lastVisibleId=${lastPostId}` : '/api/get-home-posts';
    fetch(homefeedQuery)
    .then(res => res.json())
    .then(({data}) => {
      const newPostFeed = lastPostId ? [ ...postFeed, ...data ] : [ ...data ];
      setPostFeed(newPostFeed);
      setPostFeedLoading(false);
    })
    .catch((error) => {
      setPostError(error.message);
      setPostFeedLoading(false);
    });
  };
  
  const getProfileFeed = (userId) => {
    setUserDetailsLoading(true);
    fetch(`/api/get-user/${userId}`)
    .then(res => res.json())
    .then(({data}) => {
      setUserDetails(data);
      if (data.postIds && data.postIds.length) {
        getUserFeed(userId)
      } else {
        setPostFeed([]);
      }
      setUserDetailsLoading(false);
    })
    .catch((error) => {
      setPostError(error.message);
      setUserDetailsLoading(false);
    });
  };

  const getUserFeed = (userId) => {
    fetch(`/api/get-user-posts/${userId}`)
    .then(res => res.json())
    .then(({data}) => {
      setPostFeed(data);
      setPostFeedLoading(false);
    })
    .catch((error) => {
      setPostError(error.message);
      setPostFeedLoading(false);
    });
  };

  const getPost = (postId) => { 
    setSinglePostLoading(true);
    fetch(`/api/get-post/${postId}`)
    .then(res => res.json())
    .then(({data}) => {
      setSinglePost(data);
      setSinglePostLoading(false);
    })
    .catch((error) => {
      setPostError(error.message);
      setSinglePostLoading(false);
    });
  };

	return (
		<PostFeedContext.Provider value={{ 
      userDetails, userDetailsLoading,
      postFeed, postFeedLoading, 
      singlePost, singlePostLoading, 
      postError, 
      sortPostsCategory,
      setSortPostsCategory,
      setPostError, 
      getHomeFeed,
      getProfileFeed,
      getPost
    }}>
			{children}
		</PostFeedContext.Provider>
	);
};