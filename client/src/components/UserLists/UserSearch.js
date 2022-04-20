import { useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Container, DarkBtn } from "../Styles";

import { UserContext } from "../../context/UserContext";
import CircularProgress from "../CircularProgress";
import User from "./User";

const UserSearch = () => {
  const { getAllUsers, userList, loadingUserList } = useContext(UserContext);
  const [ initialLoading, setInitialLoading ] = useState(true);
  const [ lastUserId, setLastUserId ] = useState(null);

  useEffect(() => {
    setInitialLoading(true);
    getAllUsers({ lastUserId });
  },[]);

  useEffect(() => {
    if (userList && userList.length) {
      setInitialLoading(false);
      const newLastUser = userList[userList.length-1].id;
      setLastUserId(newLastUser);
    }
  },[userList]);

  const handleGetMoreUsers = (ev) => {
    const newLastUser = userList[userList.length-1].id;
    setLastUserId(newLastUser);
    getAllUsers({lastUserId: newLastUser});
  };

  return (
    <Wrapper>
      <Title>User Search</Title>
      <SearchDiv>
        {initialLoading ? (<CircularProgress />) : (
          (userList && userList.length) ? (
            userList.map((user, index) => <User key={`${user.id}-${index}`} user={user} />)
          ) : (<NoUsers>No users</NoUsers>)
        )}
        <GetUsers>
          {(loadingUserList && !initialLoading) ? (<SmallSpinner><CircularProgress /></SmallSpinner>) : (
            <GetUsersBtn onClick={handleGetMoreUsers}>Load more</GetUsersBtn>
          )}
        </GetUsers>
      </SearchDiv>
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

const SearchDiv = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
  margin: 15px 0;
`;

const GetUsers = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const GetUsersBtn = styled(DarkBtn)`
  font-size: 100%;
`;

const NoUsers = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 25px;
`;

const SmallSpinner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & div {
    width: 40px;
    height: 40px;
    margin: 0;
  }
`;

export default UserSearch;