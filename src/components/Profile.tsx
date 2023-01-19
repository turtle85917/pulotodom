import styled from "styled-components";

const Profile: React.FC = () => {
  return <Container>
    <ProfileImage src="/slime.png" />
  </Container>;
}

export default Profile;

const Container = styled.div`
  position: fixed;
  top: 30vh;
  right: 40px;
`;

const ProfileImage = styled.img`
  width: 450px;
  opacity: 0.5;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-window-dragging: no-drag;
`;
