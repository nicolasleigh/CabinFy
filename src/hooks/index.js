import { useContext } from 'react';
import { SignupModalContext } from '../context/SignupModalProvider';
import { LoginModalContext } from '../context/LoginModalProvider';
import { AddReviewModalContext } from '../context/AddReviewModalProvider';

export const useSignupModal = () => useContext(SignupModalContext);
export const useLoginModal = () => useContext(LoginModalContext);
export const useAddReviewModal = () => useContext(AddReviewModalContext);
