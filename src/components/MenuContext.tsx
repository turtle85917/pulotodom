import styled, { css } from "styled-components";
import useContextMenu from "@hooks/useContextMenu";

const MenuContext: React.FC = () => {
  const { clicked, points } = useContextMenu();

  return <div>
    {clicked && <ContextMenu top={points[1]} left={points[0]} onContextMenu={event => event.preventDefault()}>
      <ContextMenuCategory>화면 목록</ContextMenuCategory>
      <ContextMenuList>
        <ContextMenuListItem onClick={() => window.location.href = '/'}>Home</ContextMenuListItem>
        <ContextMenuListItem>Projects</ContextMenuListItem>
      </ContextMenuList>
      <ContextMenuDividingLine />
      <ContextMenuCategory>테스트</ContextMenuCategory>
      <ContextMenuList>
        <ContextMenuListItem>개발 중</ContextMenuListItem>
      </ContextMenuList>
      <ContextMenuDividingLine />
    </ContextMenu>}
  </div>;
}

export default MenuContext;

const ContextMenu = styled.div<{ top: number; left: number; }>`
  position: absolute;
  width: 16em;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
`;

const ContextMenuCategory = styled.div`
  margin-top: 0.5em;
  margin-left: 3em;
  color: #cfcfcf;
  font-size: 10pt;
  position: relative;

  &::before, &::after {
    content: '';
    display: block;
    position: absolute;
    background: white;
    width: 1.5em;
    height: 0.1px;
    top: 50%;
    left: -2em;
  }

  &::after {
    width: 10vw;
    left: 5em;
  }
`;

const ContextMenuDividingLine = styled.hr`
  width: 90%;
`;

const ContextMenuList = styled.ul`
  box-sizing: border-box;
  padding: 0.3em;
  margin: 0;
  list-style: none;
`;

const ContextMenuListItem = styled.li`
  padding: 0.5em 0.6em;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #666666;
  }
`;
