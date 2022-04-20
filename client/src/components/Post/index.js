import styled from "styled-components";
import { Container } from "../Styles";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import ActionBar from "./ActionBar";
import PostComments from "./PostComments";

const Post = ({ post, isPostDetails }) => {
  return (
    <Wrapper>
      <PostDiv>
        <PostHeader user={post.user} timestamp={post.createdAt} category={post.category} />
        <PostContent status={post.status} link={post.link} image={post.image} />
        <ActionBar postId={post.id} likedBy={post.likedBy} comments={post.comments} />
      </PostDiv>
      {isPostDetails && <PostComments post={post} />}
    </Wrapper>
  )
};

const Wrapper = styled(Container)`
  margin: 15px 0;
`;

const PostDiv = styled.div`
  padding: 25px;
  border-bottom: 1px solid var(--color-lighter-grey);
  width: 100%;
`;

export default Post;