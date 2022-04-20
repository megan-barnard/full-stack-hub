import styled from "styled-components";
import { Container } from "../Styles";

const DirectMessaging = () => {
  return (
    <Wrapper>
      <Title>Messages</Title>
      <MessageDiv>
        Message thread
      </MessageDiv>
      <MessageDiv>
        Message thread
      </MessageDiv>
      <MessageDiv>
        Message thread
      </MessageDiv>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 15px 0;
  width: 100%;
`;

const Title = styled.div`
  font-family: var(--font-logo);
  font-size: 200%;
  font-weight: bold;
`;

const MessageDiv = styled(Container)`
  padding: 25px;
  margin: 15px 0;
  width: 100%;
`;

export default DirectMessaging;