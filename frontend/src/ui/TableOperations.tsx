import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 670px) {
    gap: 1rem;
  }

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }
`;

export default TableOperations;
