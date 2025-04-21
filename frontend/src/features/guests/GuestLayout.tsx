import { Outlet } from "react-router-dom";
import GuestHeader from "./GuestHeader";

function GuestLayout() {
  return (
    <div className='bg-cGrey-100'>
      <GuestHeader />
      <div className='pt-20 px-2 pb-5 sm:px-6 sm:pt-24 md:pt-28 sm:pb-14 lg:pt-32 lg:px-16 lg:pb-20'>
        <div className='max-w-[1200px] mx-auto'>
          <Outlet />
        </div>
      </div>
      {/* <GuestFooter /> */}
    </div>
  );
}

export default GuestLayout;
