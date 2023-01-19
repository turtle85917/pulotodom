import styled, { css } from "styled-components";

const Profile: React.FC<{ css?: string }> = ({ css }) => {
  return <>
    <ProfileImage src="/slime.png" css={css} />
  </>;
}

export default Profile;

const ProfileImage = styled.img<{ css?: string; }>`
  width: 50px;
  border-radius: 9999px;
  ${(props) => css`${props.css ?? ''}`}
`;
