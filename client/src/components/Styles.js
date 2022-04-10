import styled from "styled-components";
import { Link } from "react-router-dom";


// import Container from "../GlobalStyles";
export const Container = styled.div`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--color-lighter-grey);
  border-radius: 7px;
  background-color: white;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

// User avatar
export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid var(--color-light-grey);
`;

// User display name
export const DisplayName = styled.div`
  font-weight: bold;
  font-size: 120%;
  margin-bottom: 3px;
`;

export const UnstyledLink = styled(Link)`
  color: var(--color-dark-grey);
  text-decoration: none;
  cursor: pointer;
`;
