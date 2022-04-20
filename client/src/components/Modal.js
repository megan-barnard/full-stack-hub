import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const Modal = ({ handleClose, show, children, title }) => {
  return (
    <Wrapper className={show ? "visible" : ""}>
      <MainModal className="modal-main">
        <ModalHeader>
          <ModalTitle>{ title }</ModalTitle>
          <CloseBtn type="button" onClick={handleClose}><FaTimes size={20}/></CloseBtn>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </MainModal>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.3);
  &.visible {
    display: block;
  }
`;

const MainModal = styled.div`
  position:fixed;
  background: white;
  width: 80%;
  max-width: 500px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
  @media screen and (min-width: 950px) {
    width: 500px;
  }
  @media screen and (max-width: 949px) { 
    width: 400px;
  }
  @media screen and (max-width: 575px) {
    width: 90%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-light-grey);
  padding: 10px;
`;

const ModalTitle = styled.div`
  width: 100%;
  text-align: center;
  font-family: var(--font-logo);
  font-weight: bold;
  font-size: 120%;
  color: var(--color-dark-grey);
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  padding-right: 10px;
  & svg {
    color: var(--color-dark-grey);
  }
`;

const ModalBody = styled.div`
  height: 400px;
  overflow-y: scroll;
  padding: 15px;
`;

export default Modal;