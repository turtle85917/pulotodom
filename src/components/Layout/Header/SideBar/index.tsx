import styled from "styled-components";

const SideBar: React.FC<{ open: boolean }> = ({ open }) => {
  return <Container className={open ? "focus" : ''}>
    <Background />
    <Content>
      <Category>작업물 목록</Category>
    </Content>
  </Container>;
}

export default SideBar

const Container = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  height: 100vh;
  transition: 500ms;
  z-index: -1;
  left: -16em;

  &.focus {
    left: 0;
  }
`;

const Background = styled.div`
  display: block;
  width: 15em;
  background-color: white;
  border-top-right-radius: 0.5em;
  box-shadow: 5px 0 10px 0px #00000053;
`;

const Content = styled.div`
  position: absolute;
  margin-top: 5em;
  margin-left: 1em;
`;

const Category = styled.div`
  color: #727272;
  margin-top: 1.2em;

  &::before, &::after {
    content: '';
  }
`;
