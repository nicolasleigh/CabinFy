import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: { email, username: currentName },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [username, setUsername] = useState(currentName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    updateUser(
      { username, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setUsername(currentName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id='username'
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
