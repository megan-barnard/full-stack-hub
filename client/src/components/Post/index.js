import styled from "styled-components";
import { Container } from "../Styles";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import ActionBar from "./ActionBar";
import PostComments from "./PostComments";

import { users } from "../../assets/testData";

const Post = ({post}) => {
  const postAuthor = users[post.authorId];

  return (
    <Wrapper>
      <PostDiv>
        <PostHeader post={post} postAuthor={postAuthor} />
        <PostContent post={post} />
        <ActionBar post={post} />
      </PostDiv>
      <PostComments post={post} />
    </Wrapper>
  )
};

const Wrapper = styled(Container)`
  margin-top: 30px;
`;

const PostDiv = styled.div`
  padding: 25px;
  border-bottom: 1px solid var(--color-lighter-grey);
  width: 100%;
`;

export default Post;