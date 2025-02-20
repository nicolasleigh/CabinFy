import styled from 'styled-components';

export const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-600);
    }

    @media (max-width: 550px) {
      padding: 0.4rem 0.6rem;
      margin-right: 0.8rem;
    }
  }

  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;

export const FileInputMultiple = styled.input.attrs({
  type: 'file',
  multiple: true,
})`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-600);
    }
    @media (max-width: 550px) {
      padding: 0.4rem 0.6rem;
      margin-right: 0.8rem;
    }
  }

  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`;
