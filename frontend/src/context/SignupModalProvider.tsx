import { createContext, useState } from 'react';

export const SignupModalContext = createContext();

export const SignupModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SignupModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SignupModalContext.Provider>
  );
};
