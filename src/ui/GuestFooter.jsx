import styled from 'styled-components';

const StyledFooter = styled.footer`
  /* background-color: var(--color-grey-0); */
  /* padding: 1.2rem 7rem; */
  border-top: 1px solid var(--color-grey-400);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  margin-top: 5rem;
  padding: 3rem 0 0 0;
  font-size: 1.4rem;
  width: 90%;
`;

const Copyright = styled.div`
  color: var(--color-grey-400);
`;

const GithubIcon = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-around;
`;

export default function GuestFooter() {
  return (
    <StyledFooter>
      <Copyright>
        <p>&copy; 2024 Nicolas Leigh.</p>
      </Copyright>
      <GithubIcon>
        <a target='_blank' rel='noopener noreferrer' href=''>
          Frontend
        </a>
        <a target='_blank' rel='noopener noreferrer' href=''>
          Backend
        </a>
      </GithubIcon>
    </StyledFooter>
  );
}
