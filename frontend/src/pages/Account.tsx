import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <h1 className='text-xl font-semibold mb-5'>Update Your Account</h1>

      <div className='mb-5'>
        <h3 className=' mb-2 font-semibold'>Update User Data</h3>
        <UpdateUserDataForm />
      </div>

      <div className='mb-5'>
        <h3 className=' mb-2 font-semibold'>Update Password</h3>
        <UpdatePasswordForm />
      </div>
    </>
  );
}

export default Account;
