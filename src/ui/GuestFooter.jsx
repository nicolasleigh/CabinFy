import styled, { css } from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const StyledFooter = styled.footer`
  border-top: 1px solid var(--color-grey-400);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 3rem;
  font-size: 1.4rem;
  width: 88%;

  ${(props) =>
    props.admin &&
    css`
      border-top: 1px solid var(--color-grey-50);
      margin-top: 0rem;
      width: 100%;
      padding: 2rem 4rem;
      /* background-color: var(--color-grey-0); */

      @media (max-width: 1000px) {
        padding: 2rem 1rem;
      }
    `}

  @media (max-width: 550px) {
    width: 100%;
    padding: 1.2rem;
  }
  @media (max-width: 400px) {
    padding: 1rem 0.4rem;
    font-size: 1rem;
  }
`;

const Copyright = styled.div`
  color: var(--color-grey-400);
`;

const GithubIconGroup = styled.div`
  display: flex;
  gap: 4rem;
  font-size: 1.4rem;
  align-items: center;
  justify-content: space-around;

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  span {
    color: var(--color-grey-400);
  }

  a {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: var(--color-grey-500);
  }

  @media (max-width: 550px) {
    gap: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

export default function GuestFooter({ admin }) {
  return (
    <StyledFooter admin={admin}>
      <Copyright>
        <p>&copy; 2024 Nicolas Leigh.</p>
      </Copyright>
      <GithubIconGroup>
        <div>
          <span>Frontend:</span>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='
        https://github.com/NicolasLi2/hotel-app-frontend
        '
          >
            <FaGithub />
          </a>
        </div>

        <div>
          <span>Backend:</span>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='
        https://github.com/NicolasLi2/hotel-app-backend
        '
          >
            <FaGithub />
          </a>
        </div>
      </GithubIconGroup>
    </StyledFooter>
  );
}
