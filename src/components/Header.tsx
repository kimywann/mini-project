import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  box-shadow: 0 1px 0 rgb(228, 228, 228);
  color: rgb(109, 31, 188);
  display: flex;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Zip File Editor</Title>
    </HeaderContainer>
  );
};

export default Header;
