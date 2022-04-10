import styled from "styled-components";

const PostContent = ({post}) => {
  
  return (
    <Wrapper>
      <Caption>{post.status}</Caption>
      {(post.image) && 
        <Image src={post.image} loading="lazy" /> 
      }
    </Wrapper>
  )
};

const Wrapper = styled.div`


`;
const Caption = styled.div`
  margin: 15px 0;


`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 500px;
  border-radius: 4px;

`;

export default PostContent;