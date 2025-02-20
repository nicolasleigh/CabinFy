import { createContext, useState } from 'react';

export const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};
