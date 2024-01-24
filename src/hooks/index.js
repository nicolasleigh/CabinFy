import { useContext } from 'react';
import { SignupModalContext } from '../context/SignupModalProvider';
import { LoginModalContext } from '../context/LoginModalProvider';

export const useSignupModal = () => useContext(SignupModalContext);
export const useLoginModal = () => useContext(LoginModalContext);
