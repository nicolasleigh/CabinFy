import styled, { css } from 'styled-components';

const Form = styled.form`
  ${(props) =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 550px) {
        padding: 1rem 0.5rem;
      }
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}

  ${(props) =>
    props.type === 'modal-small' &&
    css`
      width: 44rem;
      margin: 0 auto;

      @media (max-width: 750px) {
        width: 35rem;
      }
      @media (max-width: 610px) {
        width: 30rem;
      }

      @media (max-width: 510px) {
        width: 28rem;
      }

      @media (max-width: 450px) {
        width: 25rem;
      }
      @media (max-width: 380px) {
        width: 21rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
