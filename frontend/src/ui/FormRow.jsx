import { css, styled } from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 15rem 1fr 0.8fr;
    gap: 1rem;
  }
  @media (max-width: 700px) {
    grid-template-columns: 15rem 1fr 0.4fr;
    gap: 1rem;
  }
  @media (max-width: 600px) {
    grid-template-columns: 15rem 1fr 0.2fr;
    gap: 1rem;
  }
  @media (max-width: 550px) {
    grid-template-columns: 15rem 1fr 0.1fr;
    gap: 1rem;
  }

  ${(props) =>
    props.$isSetting &&
    css`
      @media (max-width: 550px) {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, $isSetting }) {
  return (
    <StyledFormRow $isSetting={$isSetting}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
