import styled from "styled-components";
import { Avatar, Container, DarkBtn } from "../Styles";
import { useEffect, useContext } from "react";
import { FaBriefcase, FaLaptopCode, FaUserAlt, FaUpload } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

import CircularProgress from "../CircularProgress";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";

const CreatePost = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const { 
    currentPost, setCurrentPost, 
    postLoading, setPostLoading, 
    postProgress, setPostProgress, 
    postError, setPostError, 
    postSuccess, setPostSuccess,
    uploadPhoto, 
    createNewPost
  } = useContext(PostContext);

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

  const imageChange = (ev) => {
    ev.preventDefault();
    const image = ev.target.files[0];
    const newCurrentPost = { ...currentPost, image };
    setCurrentPost(newCurrentPost);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setPostError('');
    setPostLoading(true);
    setPostProgress(0);
    if (currentUser.id && currentPost.status && currentPost.category) {
      if (currentPost.image) {
        uploadPhoto({authorId: currentUser.id, ...currentPost});
      } else {
        createNewPost({authorId: currentUser.id, ...currentPost})
      }
    } else {
      setPostError('Missing data');
      setPostLoading(false);
    }
  };

  return (
    !postLoading ? (
      <Wrapper>
        {(currentUser && currentUser.profile) ? (
          <>
            <Form onSubmit={handleSubmit}>  
              <TextDiv>
                <Avatar src={currentUser.profile.avatarSrc} />
                <TextAreaInput value={currentPost.status} onChange={handleChange} maxLength="1000" rows="6" name="status" placeholder="Write what's on your mind..." required />
              </TextDiv>

              <LinkInput value={currentPost.link} onChange={handleChange} name="link" placeholder="https://" />

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
                  <ImageInput 
                    type="file"  
                    onChange={imageChange} 
                    name="image" 
                    accept="image/png, image/jpeg" 
                  />
                </div>
                <DarkBtn type="submit">Post</DarkBtn>
              </ConfirmDiv>  
              {postError && <ErrorMessage>ERROR: { postError }</ErrorMessage>}     
            </Form>
          </>
          ) : (<PleaseLogin>Please <LoginLink to='/login'> login </LoginLink> to post</PleaseLogin>)
        }
      </Wrapper>
    ) : (
      <LoadingDiv>
        {(postProgress && postProgress !== 100) ? (<LoadingProgress><ProgressBar width={`${postProgress}%`}></ProgressBar></LoadingProgress>) : (<CircularProgress />)}
      </LoadingDiv>
    )
  )
};

const Wrapper = styled(Container)`
  margin-top: 30px;
  width: 100%;
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
  margin-top: 15px;
  text-align: right;
  font-family: sans-serif;
  font-size: 80%;
  color: red;
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
  padding: 5px;
`;

const LinkInput = styled.input`
  font-size: 15px;
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

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const LoadingProgress = styled.div`
  width: 300px;
  height: 40px;
  background-color: var(--color-light-grey);
  border-radius: 5px;
`;

const ProgressBar = styled.div`
  height: 40px;
  background-color: var(--color-logo);
  border-radius: 5px;
`;

export default CreatePost;