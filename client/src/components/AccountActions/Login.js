import styled from "styled-components";
import { Container, LightBtn } from "../Styles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const { currentUser, userError, setUserError, loginCurrentUser } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  const handleLoginChange = (ev) => {
    const { name, value } = ev.target;
    setLoginDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLoginSubmit = (ev) => {
    ev.preventDefault();
    setUserError('');
    if (loginDetails.email && loginDetails.password) {
      loginCurrentUser(loginDetails);
    } else {
      setUserError('Missing data');
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <Title>Login</Title>
        <Form onSubmit={handleLoginSubmit} autoComplete="off">  
          <UserInputDiv>
            <UserInputLabel htmlFor="email">Email: </UserInputLabel>
            <UserInput 
              value={loginDetails.email} 
              onChange={handleLoginChange} 
              type="email"
              id="email" 
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
              autocomplete="current-password"
              required 
            />
            {userError && <Error>{userError}</Error>}
            <LoginBtn type="submit">Login</LoginBtn>
          </UserInputDiv>
        </Form>
        <SignupLink to="/signup">Need an account? Signup</SignupLink>
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

const LoginBtn = styled(LightBtn)`
  margin: 30px auto 0;
`;

const Error = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 80%;
`;

const SignupLink = styled(Link)`
  color: white;
`;


export default Login;