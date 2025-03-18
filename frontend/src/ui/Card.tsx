import styled from "styled-components";
// import { FaStar } from 'react-icons/fa6';
import { AiFillStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const CardLayout = styled(Link)`
  width: 100%;
  /* background-color: red; */
  /* max-height: 40rem; */
  /* display: block; */
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  color: var(--color-grey-700);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: var(--shadow-lg);
  }

  /* @media (max-width: 1220px) {
    max-height: 37rem;
  } */
`;

const CardImg = styled.img`
  display: block;
  aspect-ratio: 3/2;
  /* aspect-ratio: 1; */
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  border: 1px solid var(--color-grey-200);

  /* outline: 2px solid var(--color-grey-100); */
`;

const CardTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.6rem;
  width: 100%;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const CardNameBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardRate = styled.div`
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
`;
const CardTextBed = styled.div`
  display: flex;
  gap: 0.4rem;
  color: var(--color-grey-500);
`;
const CardPrice = styled.div`
  margin-top: 0.6rem;
`;

export default function Card({ id, src, name, bed, price, rate, discount }) {
  const navigate = useNavigate();
  return (
    <div
      className='cursor-pointer border rounded-t-md rounded-b-md bg-cGrey-0'
      onClick={() => navigate(`/cabin/${id}`)}
    >
      <img className='block border-b object-cover object-center aspect-[3/2] rounded-t-md' src={src} alt={src} />
      <div className='text-cGrey-600 py-2 px-2 rounded-b-md '>
        <div className='flex justify-between items-center'>
          <div>{name}</div>
          {rate && (
            <div className='flex items-center justify-center gap-[2px]'>
              <AiFillStar size={12} />
              {rate}
            </div>
          )}
        </div>
        <div className='text-cGrey-500 flex gap-2 items-center mb-2'>
          {bed}
          {Number(bed) === 1 ? <span>bedroom</span> : <span>bedrooms</span>}
        </div>
        <div className='text-sm font-semibold'>
          {price}
          {discount ? <span> &bull; {discount}% discount</span> : null}
        </div>
      </div>
    </div>
  );

  // return (
  //   <CardLayout to={`/cabin/${id}`}>
  //     <CardImg src={src} alt={src} />
  //     <CardTextBox>
  //       <CardNameBox>
  //         <div>{name}</div>
  //         {rate && (
  //           <CardRate>
  //             {/* <FaStar size={12} /> */}
  //             <AiFillStar size={12} />
  //             {rate}
  //           </CardRate>
  //         )}
  //       </CardNameBox>
  //       <CardTextBed>
  //         {bed}
  //         {Number(bed) === 1 ? <span>bedroom</span> : <span>bedrooms</span>}
  //       </CardTextBed>
  //       <CardPrice>
  //         {price}
  //         {discount ? <span> &bull; {discount}% discount</span> : null}
  //         {/* <CardPriceText> &bull; night</CardPriceText> */}
  //       </CardPrice>
  //     </CardTextBox>
  //   </CardLayout>
  // );
}
