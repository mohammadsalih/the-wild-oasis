import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem 1.2rem;

  font-size: 1.4rem;
  font-weight: 500;

  color: var(--color-brand-50);

  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);

  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
  }
`;

export default Input;
