import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  ${(props) => props.$between && 'justify-content: space-between;'}
`;

export default ButtonGroup;
