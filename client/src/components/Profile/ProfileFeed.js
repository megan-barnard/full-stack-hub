import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Container } from "../Styles";
import Post from "../Post/index";
import { PostFeedContext } from "../../context/PostFeedContext";

const ProfileFeed = () => { // Send an array of posts
  const { sortPostsCategory, postFeed } = useContext(PostFeedContext);
  const [ sortedFeed, setSortedFeed ] = useState([]);

  useEffect(() => {
    setSortedFeed(postFeed.filter(post => post.category === sortPostsCategory));
    console.log('test',postFeed.filter(post => post.category === sortPostsCategory));
  }, [sortPostsCategory]);

  return (
    <Wrapper>
      {(postFeed && postFeed.length) ? (
        postFeed.map((post) => <Post key={post.id} post={post} />)
        ) : (
        <EmptyPosts>No available Posts</EmptyPosts>
      )}      
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyPosts = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  margin-top: 25px;
  text-align: center;
`;

export default ProfileFeed;