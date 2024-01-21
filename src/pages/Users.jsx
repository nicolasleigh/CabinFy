import LogupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';

function NewUsers() {
  return (
    <>
      <Heading as='h1'>Create a new user</Heading>
      <LogupForm />
    </>
  );
}

export default NewUsers;
