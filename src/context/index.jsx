import { LoginModalProvider } from './LoginModalProvider';
import { SignupModalProvider } from './SignupModalProvider';

export const ContextProvider = ({ children }) => {
  return (
    <SignupModalProvider>
      <LoginModalProvider>{children}</LoginModalProvider>
    </SignupModalProvider>
  );
};
