import { useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";

function TodayItem({ activity }) {
  const { id, status, guest, numNights } = activity;
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <li className='grid grid-cols-[6rem_1fr_5rem_6rem] px-2 '>
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
