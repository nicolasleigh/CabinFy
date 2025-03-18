import styled from "styled-components";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media (max-width: 1000px) {
    grid-template-columns: 4.4rem 1fr;
    column-gap: 1.2rem;
    padding: 1.3rem;
  }
  @media (max-width: 650px) {
    grid-template-columns: 3.6rem 1fr;
    column-gap: 0.5rem;
    padding: 0.6rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);

    @media (max-width: 1000px) {
      width: 2.2rem;
      height: 2.2rem;
    }

    @media (max-width: 650px) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media (max-width: 1000px) {
    font-size: 1rem;
  }

  @media (max-width: 650px) {
    font-size: 0.8rem;
  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  @media (max-width: 1000px) {
    font-size: 1.4rem;
  }

  @media (max-width: 650px) {
    font-size: 1.2rem;
  }
`;

// type colorEnum = {};
enum colorEnum {
  blue = "blue",
  green = "green",
  yellow = "yellow",
  indigo = "indigo",
}

function Stat({ icon, title, value, color }: { color: colorEnum }) {
  const colorMap = {
    blue: "bg-cBlue-100 text-cBlue-700 ",
    green: "bg-cGreen-100 text-cGreen-700",
    yellow: "bg-cYellow-100 text-cYellow-700 ",
    indigo: "bg-cIndigo-100 text-cIndigo-700 ",
  };

  return (
    <div className='border rounded-md p-2 grid grid-cols-[64px_1fr] gap-x-2 gap-y-1 grid-rows-2 h-full '>
      <div
        className={`${colorMap[color]} rounded-full w-16 h-16 row-span-full flex items-center justify-center self-center`}
      >
        {icon}
      </div>
      <p className='font-semibold text-lg text-cGrey-500 uppercase tracking-tight self-end'>{title}</p>
      <p className='leading-6 font-semibold text-lg'>{value}</p>
    </div>
  );
}

// function Stat({ icon, title, value, color }) {
//   return (
//     <StyledStat>
//       <Icon color={color}>{icon}</Icon>
//       <Title>{title}</Title>
//       <Value>{value}</Value>
//     </StyledStat>
//   );
// }

export default Stat;
