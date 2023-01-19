import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "@Layout/Header/SideBar";

const Header: React.FC = () => {
  const [hover, setHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return <div>
    <Container>
      <Icon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpen(!open)}>
        <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" : hover ? "M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
      </Icon>
      <Nickname>플로토돔</Nickname>
    </Container>
    <SideBar open={open} />
  </div>;
}

export default Header;

const Container = styled.div`
  width: 100vw;
  max-height: 10em;
  background-color: var(--personal-color);
`;

const Icon = styled.svg`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  margin: 1em;
  border-radius: 0.5em;
  transition: 200ms;

  &:hover {
    background-color: #ffffff2b;
    cursor: pointer;
  }
`;

const Nickname = styled.h2`
  padding: 0.5em 2em 0.5em;
  user-select: none;
  -webkit-user-drag: none;
  -moz-window-dragging: no-drag;
`;
