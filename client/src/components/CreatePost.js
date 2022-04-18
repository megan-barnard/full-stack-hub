import styled from "styled-components";
import { Avatar, Container, DarkBtn } from "./Styles";
import { useEffect, useContext } from "react";
import { FaBriefcase, FaLaptopCode, FaUserAlt, FaUpload } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

import CircularProgress from "./CircularProgress";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { PostContext } from "../context/PostContext";

const CreatePost = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { currentPost, setCurrentPost, createNewPost, postLoading, setPostLoading, postError, setPostError, postSuccess, setPostSuccess } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    if (postSuccess) {
      history.push("/");
      setPostSuccess(false);
      setPostLoading(false);
    }
  }, [postSuccess])

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setCurrentPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setPostError('');
    setPostLoading(true);
    if (currentUser.id && currentPost.status && currentPost.category) {
      const image = currentPost.image ? currentPost.image : '';
      createNewPost({authorId: currentUser.id, status: currentPost.status, image, category: currentPost.category })
    } else {
      setPostError('Missing data');
      setPostLoading(false);
    }
  };

  return (
    !postLoading ? (
      <Wrapper>
        {(currentUser && currentUser.profile && currentUser.profile.avatarSrc) ? (
          <>
            <Form onSubmit={handleSubmit}>  
              <TextDiv>
                <Avatar src={currentUser.profile.avatarSrc} />
                <TextAreaInput value={currentPost.status} onChange={handleChange} maxlength="2000" rows="6" name="status" placeholder="Text" required />
              </TextDiv>
        
              <CategoryDiv>
                <Title>Type of post:</Title>
                <CategoryLabel>
                  <CategoryInput type="radio" value="career" name="category" onChange={handleChange} checked={currentPost.category === "career"} />
                  <Category><FaBriefcase size={25} />career</Category>
                </CategoryLabel>
                <CategoryLabel>
                  <CategoryInput type="radio" value="project" name="category" onChange={handleChange} checked={currentPost.category === "project"} />
                  <Category><FaLaptopCode size={25} />project</Category>
                </CategoryLabel>
                <CategoryLabel>
                  <CategoryInput type="radio" value="personal" name="category" onChange={handleChange} checked={currentPost.category === "personal"} />
                  <Category><FaUserAlt size={25} />personal</Category>
                </CategoryLabel>
              </CategoryDiv>

              <ConfirmDiv>
                <div>
                  <FaUpload size={25} />
                  <ImageInput value={currentPost.image} type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={handleChange} name="image" placeholder="Image" />
                </div>
                <DarkBtn type="submit">Post</DarkBtn>
              </ConfirmDiv>      
            </Form>
            <div>{postError && <ErrorMessage>ERROR: { postError }</ErrorMessage>}</div> 
          </>
          ) : (<PleaseLogin>Please <LoginLink to='/login'> login </LoginLink> to post</PleaseLogin>)
        }
      </Wrapper>
    ) : (<CircularProgress />)
  )
};

const Wrapper = styled(Container)`
  margin-top: 30px;
  min-width: 550px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const TextDiv = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const ConfirmDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 70px;
  & div {
    display: flex;
  }
`;

const ErrorMessage = styled.div`
  padding: 15px;
  text-align: center;
  font-family: sans-serif;
`;

const Title = styled.div`
  font-weight: bold;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  font-size: 18px;
  resize: none;
  border: 1px solid var(--color-lighter-grey);
  outline: none;
`;

const ImageInput = styled.input`
  font-size: 18px;
  cursor: pointer;
`;

const CategoryDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-light-grey);
`;

const CategoryLabel = styled.label`
  cursor: pointer;
  width: 20%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Category = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
  & svg {
    margin-bottom: 5px;
    color: var(--color-light-grey);
  }
  &:hover svg {
    color: #ccc;
  }
`;

const CategoryInput = styled.input`
  position: absolute;
  left: -999px;
  opacity: 0;
  cursor: pointer;
  &:checked ~ span svg {
    color: var(--color-dark-grey);
  }
`;

const PleaseLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  text-align: center;
`;

const LoginLink = styled(Link)`
  color: var(--color-dark-grey);
  margin: 0 5px;
`;

export default CreatePost;