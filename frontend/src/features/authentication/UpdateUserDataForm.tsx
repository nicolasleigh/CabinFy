import { useState } from "react";

// import Button from "../../ui/Button";
import { FileInput } from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className='flex flex-col gap-3 border py-6 px-10 rounded-md'>
      <div className='flex items-center'>
        <Label className='w-36'>Email Address</Label>
        <Input value={email} disabled className='bg-cGrey-100 w-56' />
      </div>

      <div className='flex items-center'>
        <Label htmlFor='username' className='w-36'>
          Full Name
        </Label>
        <Input
          type='text'
          value={username}
          id='username'
          disabled={isUpdating}
          onChange={(e) => setUsername(e.target.value)}
          className='w-56'
        />
      </div>

      <div className='flex items-center'>
        <Label htmlFor='avatar' className='w-36'>
          Avatar Image
        </Label>
        <Input
          type='file'
          id='avatar'
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
          className='w-56 text-cGrey-400 pt-[6px] '
          accept='image/*'
        />
      </div>

      <div className='flex gap-2 justify-end'>
        <Button
          className='hover:bg-cGrey-300'
          type='reset'
          variant='secondary'
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className='bg-cBrand-500 hover:bg-cBrand-600 text-white' disabled={isUpdating}>
          Update account
        </Button>
      </div>
    </form>
  );
  // return (
  //   <Form onSubmit={handleSubmit}>
  //     <FormRow label='Email address'>
  //       <Input value={email} disabled />
  //     </FormRow>
  //     <FormRow label='Full name'>
  //       <Input
  //         type='text'
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //         id='username'
  //         disabled={isUpdating}
  //       />
  //     </FormRow>
  //     <FormRow label='Avatar image'>
  //       <FileInput id='avatar' accept='image/*' onChange={(e) => setAvatar(e.target.files[0])} disabled={isUpdating} />
  //     </FormRow>
  //     <FormRow>
  //       <Button type='reset' variation='secondary' disabled={isUpdating} onClick={handleCancel}>
  //         Cancel
  //       </Button>
  //       <Button disabled={isUpdating}>Update account</Button>
  //     </FormRow>
  //   </Form>
  // );
}

export default UpdateUserDataForm;
