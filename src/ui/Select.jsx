import styled from 'styled-components';

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  @media (max-width: 670px) {
    font-size: 1.2rem;
    padding: 0.7rem 1.1rem;
  }

  @media (max-width: 580px) {
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.3rem 0.4rem;
  }
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect {...props} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
