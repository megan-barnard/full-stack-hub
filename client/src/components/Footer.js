import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <FooterLinks>
        <FooterLink to="/">About</FooterLink>
        <FooterLink to="/">Help</FooterLink>
        <FooterLink to="/">Privacy</FooterLink>
        <FooterLink to="/">Terms</FooterLink>
        <FooterLink to="/">Features</FooterLink>
      </FooterLinks>
      <Copyright>© 2022 Insert name here</Copyright>
    
    </Wrapper>
  )
};

const Wrapper = styled.div`
  position: relative;
  bottom: 0;
  left: 0; 
  width: 100%;
  height: var(--footer-height);
  color: white;
  background-color: var(--color-dark-grey);
  overflow: hidden;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 15px;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 10px 15px;
`;

const Copyright = styled.div`
  text-align: center;
`;



export default Footer;