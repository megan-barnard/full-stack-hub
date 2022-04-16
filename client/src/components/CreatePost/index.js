import styled from "styled-components";
import { Avatar, Container, DarkBtn } from "../Styles";
import { useState } from "react";
import { FaBriefcase, FaLaptopCode, FaUserAlt, FaUpload } from "react-icons/fa";

import { users } from "../../assets/testData";

const CreatePost = () => {
  const currentUser = 'junebug66';
  const user = users[currentUser];

  const [currentPost, setCurrentPost] = useState({ status: '', image: '', category: 'career' });
  const [error, setError] = useState(null); 

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setCurrentPost(prevState => ({ ...prevState, [name]: value }));
    console.log('test change');
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError('');
    console.log('test submit');

    if (currentPost.status && currentPost.image && currentPost.category) {
      console.log('submitted');
    } else {
      setError('Missing data');
    }
  };

  // id: "test4",
  // authorId: "chloegainz",
  // timestamp: "2019-12-29T22:19:00+00:00",
  // likedBy: ["swagmoney888","kaitkool1005"],
  // status: "The principle of giant military cats deterrence states that a countrys possession of giant military cats discourages other countries from using giant military cats",
  // image: "",
  // category: "personal"

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>  
        <TextDiv>
          <Avatar src={user.profile.avatarSrc} />
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
      {/* <div>{error && <ErrorMessage>ERROR: { error }</ErrorMessage>}</div>  */}
    </Wrapper>
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

export default CreatePost;