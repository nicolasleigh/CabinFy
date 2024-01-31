import { cloneElement, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledDropdown = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  width: 25rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 0;
  z-index: 1000;

  & > a:last-of-type {
    /* background-color: var(--color-grey-400); */
    border-top: 1px solid var(--color-grey-100);
  }
  & > a {
    padding: 1.2rem 1.4rem;
    display: block;
    transition: all 0.2s;
    &:hover {
      background-color: var(--color-grey-100);
    }
  }
`;

export default function DropDown({ trigger, menu }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const ref = useOutsideClick(() => setOpen(false));
  return (
    <StyledDropdown ref={ref}>
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <DropdownMenu>
          {menu.map((item, index) => {
            return (
              <Link key={index} to={item.props.to} onClick={handleOpen}>
                {cloneElement(item)}
              </Link>
            );
          })}
        </DropdownMenu>
      ) : null}
    </StyledDropdown>
  );
}
