import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Timer from './Timer';
import { useForgetPass } from './useForgetPass';

export default function ForgetPassForm() {
  const { state } = useLocation();
  const [email, setEmail] = useState(state?.email || '');
  const [disableBtn, setDisableBtn] = useState(false);

  const { forgetPass, isLoading } = useForgetPass();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    forgetPass({ email });
    setDisableBtn(true);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disableBtn}
        />
      </FormRowVertical>

      <FormRowVertical>
        {disableBtn ? (
          <Timer setDisableBtn={setDisableBtn} />
        ) : (
          <Button disabled={disableBtn}>Send password reset link</Button>
        )}
      </FormRowVertical>
    </Form>
  );
}
