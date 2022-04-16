import styled from "styled-components";
import { FaTh, FaBriefcase, FaLaptopCode, FaUserAlt } from "react-icons/fa";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

const ProfileActionBar = ({posts}) => {
  
  tippy('#action-career', {content: "career updates", arrow: true, theme: 'light', delay: 1000,},);
  tippy('#action-project', {content: "projects", arrow: true, theme: 'light', delay: 1000,},);
  tippy('#action-personal', {content: "personal posts", arrow: true, theme: 'light', delay: 1000,},);

  const actionClicked = (action) => {
    console.log('clicked', action);
  };

  return (
    <Wrapper>
      <ActionBtn id="action-all" onClick={() => actionClicked('all')}><FaTh size={25}/></ActionBtn>
      <ActionBtn id="action-career" onClick={() => actionClicked('career')}><FaBriefcase size={25}/></ActionBtn>
      <ActionBtn id="action-project" onClick={() => actionClicked('project')}><FaLaptopCode size={25}/></ActionBtn>
      <ActionBtn id="action-personal" onClick={() => actionClicked('personal')}><FaUserAlt size={25}/></ActionBtn>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--color-light-grey);
  background-color: var(--color-dark-grey);
  padding: 10px 0;
  border-radius: 0 0 5px 5px;
`;

const ActionBtn = styled.button`
display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 10px 20px;
`;

export default ProfileActionBar;