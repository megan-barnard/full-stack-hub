import { useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import CircularProgress from "../CircularProgress";
import User from "./User";

const UserList = ({ userIds, userLabel, modalVisible }) => {
  const { getUsersByIds, userList } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);
  const [ usersLoading, setUsersLoading ] = useState(true);

  useEffect(() => {
    if (modalVisible && userList) {
      setUsers(userList);
      setUsersLoading(false);
    }
  },[userList]);

  useEffect(() => {
    if (modalVisible && userIds.length) {
      getUsersByIds({userIds});
    } else if (modalVisible) {
      setUsers([]);
      setUsersLoading(false);
    }
  },[modalVisible])

  return (
    <Wrapper>
      {usersLoading ? (<CircularProgress />) : (
        (users && users.length) ? (
          users.map((user, index) => <User key={`${user.id}-${index}`} user={user} />)
        ) : (<NoUsers>No {userLabel}</NoUsers>)
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div``;

const NoUsers = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 25px;
`;

export default UserList;