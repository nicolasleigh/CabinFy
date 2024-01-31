import { createContext, useState } from 'react';

export const AddReviewModalContext = createContext();

export const AddReviewModalProvider = ({ children }) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <AddReviewModalContext.Provider value={{ submitted, setSubmitted }}>
      {children}
    </AddReviewModalContext.Provider>
  );
};
