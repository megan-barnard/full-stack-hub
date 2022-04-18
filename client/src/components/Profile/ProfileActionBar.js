import styled from "styled-components";
import { useContext } from "react";
import { FaTh, FaBriefcase, FaLaptopCode, FaUserAlt } from "react-icons/fa";
import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';

import { PostFeedContext } from "../../context/PostFeedContext";

const ProfileActionBar = () => {
  const { sortPostsCategory, setSortPostsCategory } = useContext(PostFeedContext);
  
  tippy('#action-career', {content: "career updates", arrow: true, theme: 'light', delay: 1000,},);
  tippy('#action-project', {content: "projects", arrow: true, theme: 'light', delay: 1000,},);
  tippy('#action-personal', {content: "personal posts", arrow: true, theme: 'light', delay: 1000,},);

  const actionClicked = (action) => {
    setSortPostsCategory(action);
  };

  return (
    <Wrapper>
      <ActionBtn id="action-all" onClick={() => actionClicked('all')} className={sortPostsCategory === 'all' ? 'selected' : '' }><FaTh size={25}/></ActionBtn>
      <ActionBtn id="action-career" onClick={() => actionClicked('career')} className={sortPostsCategory === 'career' ? 'selected' : '' }><FaBriefcase size={25}/></ActionBtn>
      <ActionBtn id="action-project" onClick={() => actionClicked('project')} className={sortPostsCategory === 'project' ? 'selected' : '' }><FaLaptopCode size={25}/></ActionBtn>
      <ActionBtn id="action-personal" onClick={() => actionClicked('personal')} className={sortPostsCategory === 'personal' ? 'selected' : '' }><FaUserAlt size={25}/></ActionBtn>
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
  &.selected {
    transform: scale(0.97);
    opacity: 0.55;
  }
`;

export default ProfileActionBar;