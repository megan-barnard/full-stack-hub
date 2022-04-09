import styled from "styled-components";

const Photo = ({imageUrl}) => {
  return (
    <Wrapper>
      <Image src={imageUrl} />
    
    </Wrapper>
  )
};

const Wrapper = styled.div`


`;

const Image = styled.img`
  width: 100%;
  border-radius: 3px;

`;

export default Photo;