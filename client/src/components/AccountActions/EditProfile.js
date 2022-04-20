import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container, DarkBtn } from "../Styles";
import { FaUpload } from "react-icons/fa";

import CircularProgress from "../CircularProgress";
import { UserContext } from "../../context/UserContext";

const EditProfile = () => {
  const history = useHistory();
  const { currentUser, editError, setEditError, uploadAvatar, userEditLoading, setUserEditLoading, editSuccess, setEditSuccess } = useContext(UserContext);
  const [ currentUserInfo, setCurrentUserInfo ] = useState({})

  useEffect(() => {
    setEditSuccess('');
    setEditError('');
    if (currentUser && currentUser.id) {
      let user = currentUser.profile;
      setCurrentUserInfo({ displayName: user.displayName, avatarSrc: user.avatarSrc, newAvatarSrc: '', bannerSrc:user.bannerSrc, newBannerSrc: '', iconColor:user.iconColor, bio:user.bio, cohort:user.cohort, languages:user.languages, websiteUrl:user.websiteUrl, githubUrl:user.githubUrl, linkedinUrl:user.linkedinUrl, instagramUrl:user.instagramUrl, facebookUrl:user.facebookUrl });
    }
  }, [currentUser]);

  useEffect(() => {
    if (editSuccess === 'success') {
      setEditSuccess('');
      setEditError('');
      setUserEditLoading(false);
      history.push(`/profile/${currentUser.id}`);
    }
  }, [editSuccess]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setCurrentUserInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const avatarChange = (ev) => {
    ev.preventDefault();
    const image = ev.target.files[0];
    const newCurrentUser = { ...currentUserInfo, newAvatarSrc: image };
    setCurrentUserInfo(newCurrentUser);
  };

  const bannerChange = (ev) => {
    ev.preventDefault();
    const image = ev.target.files[0];
    const newCurrentUser = { ...currentUserInfo, newBannerSrc: image };
    setCurrentUserInfo(newCurrentUser);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setUserEditLoading(true);
    setEditSuccess('');
    setEditError('');

    if (currentUser.id) {
      uploadAvatar({uid: currentUser.id, ...currentUserInfo});
    } else {
      setUserEditLoading(false);
      setEditError('Please login to edit');
    }
  };

  const cancelChanges = (ev) => {
    ev.preventDefault();
    let user = currentUser.profile;
    setCurrentUserInfo({ displayName: user.displayName, avatarSrc: user.avatarSrc, newAvatarSrc: '', bannerSrc:user.bannerSrc, newBannerSrc: '', iconColor:user.iconColor, bio:user.bio, cohort:user.cohort, languages:user.languages, websiteUrl:user.websiteUrl, githubUrl:user.githubUrl, linkedinUrl:user.linkedinUrl, instagramUrl:user.instagramUrl, facebookUrl:user.facebookUrl });
    setEditSuccess('');
    setEditError('');
    setUserEditLoading(false);
  };
  
  return (
    !userEditLoading ? (
    <Wrapper>
        {(currentUser && currentUser.profile) ? (
          <>
            <Form onSubmit={handleSubmit}>  
              <InputLabel><div>Display Name:</div>
                <TextInput value={currentUserInfo.displayName || ''} onChange={handleChange} name="displayName" placeholder="Display Name" required />
              </InputLabel>
              <InputLabel><div>Bio:</div>
                <BioInput value={currentUserInfo.bio || ''} onChange={handleChange} maxLength="300" rows="4" name="bio" placeholder="Add a bio"/>
              </InputLabel>
              <InputLabel><div>Icon Color (HEX)</div>
                <TextInput value={currentUserInfo.iconColor || ''} onChange={handleChange} maxLength="7" name="iconColor" placeholder="#FFFFFF" />
              </InputLabel>
              <InputLabel><div>Cohort:</div>
                <TextInput value={currentUserInfo.cohort || ''} onChange={handleChange} maxLength="50" name="cohort" placeholder="Cohort..." />
              </InputLabel>
              <InputLabel><div>Coding languages:</div>
                <TextInput value={currentUserInfo.languages || ''} onChange={handleChange} maxLength="200" name="languages" placeholder="Languages..." />
              </InputLabel>
              <InputLabel><div>Website Url:</div>
                <TextInput value={currentUserInfo.websiteUrl || ''} onChange={handleChange} maxLength="200" name="websiteUrl" placeholder="https://..." />
              </InputLabel>
              <InputLabel><div>Github Url:</div>
                <TextInput value={currentUserInfo.githubUrl || ''} onChange={handleChange} maxLength="200" name="githubUrl" placeholder="https://..." />
              </InputLabel>
              <InputLabel><div>Linkedin Url:</div>
                <TextInput value={currentUserInfo.linkedinUrl || ''} onChange={handleChange} maxLength="200" name="linkedinUrl" placeholder="https://..." />
              </InputLabel>
              <InputLabel><div>Instagram Url:</div>
                <TextInput value={currentUserInfo.instagramUrl || ''} onChange={handleChange} maxLength="200" name="instagramUrl" placeholder="https://..." />
              </InputLabel>
              <InputLabel><div>Facebook Url:</div>
                <TextInput value={currentUserInfo.facebookUrl || ''} onChange={handleChange} maxLength="200" name="facebookUrl" placeholder="https://..." />
              </InputLabel>

              <ImageInputDiv>
                <ImgInputLabel><div>New Avatar:</div>
                  <FaUpload size={25} />
                  <ImageInput type="file" onChange={avatarChange} name="avatar" accept="image/png, image/jpeg" />
                </ImgInputLabel>
                <ImgInputLabel><div>New Banner:</div>
                  <FaUpload size={25} />
                  <ImageInput type="file" onChange={bannerChange} name="banner" accept="image/png, image/jpeg" />
                </ImgInputLabel>
              </ImageInputDiv>
              <ConfirmDiv>
                <DarkBtn onClick={cancelChanges}>Cancel</DarkBtn>
                <DarkBtn type="submit">Update</DarkBtn>
              </ConfirmDiv>  
              {editError && <ErrorMessage>ERROR: { editError }</ErrorMessage>}     
            </Form>
          </>
          ) : (<PleaseLogin>Please <LoginLink to='/login'> login </LoginLink> to post</PleaseLogin>)
        }
      </Wrapper>
      ) : (<CircularProgress />)
  )
};

const Wrapper = styled(Container)`
  margin-top: 30px;
  width: 100%;
  min-width: 550px;
  margin-bottom: 15px;
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

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--color-dark-grey);
  margin: 15px 0 6px 0;
  font-weight: 500;
  font-size: 15px;
  & div {
    min-width: 150px;
    width: 30%;
    text-align: right;
    padding-right: 10px;
  }
`;

const TextInput = styled.input`
  width: 70%;
  font-size: 15px;
  border: 1px solid var(--color-lighter-grey);
`;

const BioInput = styled.textarea`
  width: 70%;
  font-size: 15px;
  resize: none;
  border: 1px solid var(--color-lighter-grey);
  border-radius: 4px;
  padding: 5px 12px;
`;

const ImageInputDiv = styled.div``;

const ImgInputLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: flex-start;
  color: var(--color-dark-grey);
  margin: 15px 0 6px 0;
  font-weight: 500;
  font-size: 15px;
  & div {
    min-width: 150px;
    width: 30%;
    text-align: right;
    padding-right: 10px;
  }
`;

const ImageInput = styled.input`
  font-size: 15px;
  cursor: pointer;
  height: auto;
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

export default EditProfile;