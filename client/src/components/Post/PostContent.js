import styled from "styled-components";

const PostContent = ({status, link, image}) => {

  return (
    <Wrapper>
      <Caption>{status}</Caption>
      {link && <PostLink target="_blank" href={link.includes("http://") ? link : `http://${link}`}>{link}</PostLink>}
      {image && <Image src={image} loading="lazy" /> }
    </Wrapper>
  )
};

const Wrapper = styled.div``;

const Caption = styled.div`
  margin: 15px 0;
`;

const PostLink = styled.a`
  color: var(--color-dark-grey);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 500px;
  border-radius: 4px;
`;

export default PostContent;