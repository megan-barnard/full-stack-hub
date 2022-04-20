import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CircularProgress from "../CircularProgress";
import Post from ".";
import { PostFeedContext } from "../../context/PostFeedContext";

const PostDetails = () => {
  const { postId } = useParams();
  const { getPost, singlePost, singlePostLoading } = useContext(PostFeedContext);

  useEffect(() => {
    getPost(postId);
  }, [postId]);

  return (
    <Wrapper>
      {(singlePostLoading || !singlePost.id) ? (<CircularProgress />) : (<Post post={singlePost} isPostDetails={true} />)}
    </Wrapper>
  )
};

const Wrapper = styled.div`


`;

export default PostDetails;