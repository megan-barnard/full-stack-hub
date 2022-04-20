import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DarkBtn } from "./Styles";

import ErrorMessage from "./ErrorMessage";
import Post from "./Post/index";
import CircularProgress from "./CircularProgress";
import { PostFeedContext } from "../context/PostFeedContext";

const HomePage = () => {
  const { postFeed, getHomeFeed, postFeedLoading } = useContext(PostFeedContext);
  const [ initialLoading, setInitialLoading ] = useState(true);
  const [ lastPostId, setLastPostId ] = useState(null);

  useEffect(() => { 
    setInitialLoading(true);
    getHomeFeed({ lastPostId });
  }, []);

  useEffect(() => {
    if (postFeed && postFeed.length) {
      setInitialLoading(false);
      const newLastPost = postFeed[postFeed.length-1].id;
      setLastPostId(newLastPost);
    }
  },[postFeed]);

  const handleGetMorePosts = (ev) => {
    const newLastPost = postFeed[postFeed.length-1].id;
    setLastPostId(newLastPost);
    getHomeFeed({lastPostId: newLastPost});
  };

  return (
    <Wrapper>
      {initialLoading ? (<CircularProgress />) : (
        <>
          {(postFeed && postFeed.length) ? (
            postFeed.map((post) => <Post key={post.id} post={post} />)
            ) : (<ErrorMessage message={'No available Posts'} />)
          }
          <GetPosts>
            {(postFeedLoading && !initialLoading) ? (<SmallSpinner><CircularProgress /></SmallSpinner>) : (
              <GetPostsBtn onClick={handleGetMorePosts}>Load more</GetPostsBtn>
            )}
          </GetPosts>
        </>
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GetPosts = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const GetPostsBtn = styled(DarkBtn)`
  font-size: 100%;
`;

const SmallSpinner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & div {
    width: 40px;
    height: 40px;
    margin: 0;
  }
`;

export default HomePage;