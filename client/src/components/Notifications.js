import styled from "styled-components";
import { Container } from "./Styles";

const Notifications = () => {
  return (
    <Wrapper>
      <Title>Notifications</Title>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
      <NotificationDiv>Notification</NotificationDiv>
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

const NotificationDiv = styled(Container)`
  padding: 25px;
  margin: 15px 0;
  width: 100%;
`;

export default Notifications;