import styled from "styled-components";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import ActionBar from "./ActionBar/index";

const Post = ({postId}) => {
  return (
    <Wrapper>
      <PostHeader postId={postId} />
      <PostContent postId={postId} />
      <ActionBar postId={postId} />
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 30px;
  border: 1px solid black;
  width: 100%;
  padding: 25px;

`;

export default Post;