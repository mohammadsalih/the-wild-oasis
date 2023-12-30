import styled from "styled-components";

function Header() {
  return <StyledHeader>header</StyledHeader>;
}

export default Header;

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;

  background-color: var(--color-grey-0);

  border-bottom: 1px solid var(--color-grey-100);
`;