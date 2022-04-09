import styled from "styled-components";

import Photo from "./Photo";
import { users, posts } from "../../assets/testData";

const PostContent = ({postId}) => {
  const post = posts[postId];
  
  return (
    <Wrapper>
      <Caption>{post.status}</Caption>
      {(post.media[0] && post.media[0].type === 'img') && 
        <Photo imageUrl={post.media[0].url } /> 
      }
    </Wrapper>
  )
};

const Wrapper = styled.div`
  padding: 15px;

`;
const Caption = styled.div`
  margin: 15px 0;


`;

export default PostContent;