import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import CheckoutButton from "./CheckoutButton";
import { Button } from "@/components/ui/button";
import { useCheckout } from "./useCheckout";
import { Badge } from "@/components/ui/badge";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 8rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 900px) {
    grid-template-columns: 6rem 1fr 5rem 6rem;
    font-size: 1.2rem;
    /* grid-template-columns: 9rem 1fr 9rem 9rem; */

    .btn {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
    }

    .tag {
      font-size: 1rem;
      padding: 0.3rem 0.5rem;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const Nights = styled.div`
  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;

function TodayItem({ activity }) {
  const { id, status, guest, numNights } = activity;
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <li className='grid grid-cols-[6rem_1fr_8rem_6rem] px-2 '>
      {status === "unconfirmed" && (
        <div className='flex justify-center items-center'>
          <div className='bg-cGreen-100 text-cGreen-700 rounded-full text-xs font-semibold px-2 py-1'>
            <span>Arriving</span>
          </div>
        </div>
      )}
      {status === "checked-in" && (
        <div className='flex justify-center items-center'>
          <div className='bg-cBlue-100 text-cBlue-700 rounded-full text-xs font-semibold px-2 py-1'>
            <span>Departing</span>
          </div>
        </div>
      )}

      <p className='font-semibold text-sm self-center'>{guest.fullName}</p>
      <p className='text-sm self-center'>{numNights} nights</p>

      {status === "unconfirmed" && (
        <button
          className='bg-cBrand-500 text-cBrand-50 text-sm hover:bg-cBrand-600 hover:text-cBrand-100 rounded-sm'
          onClick={() => navigate(`/admin/checkin/${id}`)}
        >
          Check in
        </button>
      )}
      {status === "checked-in" && (
        <button
          className='bg-cBrand-500 text-cBrand-50 text-sm hover:bg-cBrand-600 hover:text-cBrand-100 rounded-sm'
          onClick={() => checkout(id)}
          disabled={isCheckingOut}
        >
          Check out
        </button>
      )}
    </li>
  );
}

export default TodayItem;
