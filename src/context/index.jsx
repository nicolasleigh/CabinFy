import { AddReviewModalProvider } from './AddReviewModalProvider';
import { LoginModalProvider } from './LoginModalProvider';
import { SignupModalProvider } from './SignupModalProvider';

export const ContextProvider = ({ children }) => {
  return (
    <SignupModalProvider>
      <AddReviewModalProvider>
        <LoginModalProvider>{children}</LoginModalProvider>
      </AddReviewModalProvider>
    </SignupModalProvider>
  );
};
