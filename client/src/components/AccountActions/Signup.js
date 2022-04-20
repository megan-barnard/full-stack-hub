import styled from "styled-components";
import { Container, LightBtn } from "../Styles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const { currentUser, userError, setUserError, registerNewUser } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({ name: '', username: '', email: '', password: '' });
  const history = useHistory();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      history.push("/create");
    }
  }, [currentUser]);

  const handleLoginChange = (ev) => {
    const { name, value } = ev.target;
    setLoginDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLoginSubmit = (ev) => {
    ev.preventDefault();
    setUserError('');
    const validUsername = isUserNameValid(loginDetails.username);
    if (loginDetails.name && loginDetails.username && loginDetails.email && loginDetails.password) {
      if (validUsername) {
        registerNewUser(loginDetails);
      } else {
        setUserError('Invalid username');
      }
    } else {
      setUserError('Missing data');
    }
  };
  const isUserNameValid = (username) => {
    const res = /^[a-z0-9_\.]+$/.exec(username);
    const valid = !!res;
    return valid;
  }
  return (
    <Wrapper>
      <LoginContainer>
        <Title>Sign-up</Title>
        <Form onSubmit={handleLoginSubmit} autoComplete="off">  
          <UserInputDiv>
            <UserInputLabel htmlFor="name">Name: </UserInputLabel>
            <UserInput 
              value={loginDetails.name} 
              onChange={handleLoginChange} 
              type="text"
              id="name" 
              name="name" 
              required 
            />
            <UserInputLabel htmlFor="username">Username: </UserInputLabel>
            <UserInput 
              value={loginDetails.username} 
              onChange={handleLoginChange} 
              type="text"
              id="username" 
              name="username" 
              required 
            />
            <UserInputLabel htmlFor="email">Email: </UserInputLabel>
            <UserInput 
              value={loginDetails.email} 
              onChange={handleLoginChange} 
              type="text"
              id="email" 
              autoComplete="false"
              name="email" 
              required 
            />
            <UserInputLabel htmlFor="password">Password:</UserInputLabel>
            <UserInput 
              value={loginDetails.password} 
              onChange={handleLoginChange} 
              type="password"
              id="password" 
              name="password" 
              autocomplete="new-password"
              required 
            />
            {userError && <Error>{userError}</Error>}
            <LoginBtn type="submit">Create Account</LoginBtn>
          </UserInputDiv>
        </Form>
        <LoginLink to="/login">Already have an account? Login</LoginLink>
      </LoginContainer>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: center;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const LoginLink = styled(Link)`
  color: white;
`;

const LoginContainer = styled(Container)`
  background-color: var(--color-dark-grey);
`;

const UserInputDiv = styled.div`
  max-width: 400px;
  margin: auto;
`;

const Title = styled.div`
  color: white;
  text-align: center;
  font-weight: 500;
  font-size: 30px;
`;

const UserInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  margin: 15px 0 6px 0;
  font-weight: 500;
  font-size: 18px;
`;

const UserInput = styled.input`
  width: 250px;
  font-size: 15px;
`;

const Error = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 80%;
`;

const LoginBtn = styled(LightBtn)`
  margin: 30px auto 0;
`;

export default Signup;