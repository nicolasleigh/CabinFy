import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { isValidEmail } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import { PASS_LENGTH } from "@/utils/constants";

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) {
    return { ok: false, error: "Name is missing!" };
  }
  if (!isValidName.test(name)) {
    return { ok: false, error: "Name is invalid!" };
  }

  if (!email.trim()) {
    return { ok: false, error: "Email is missing!" };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Invalid email!" };
  }

  if (!password.trim()) {
    return { ok: false, error: "Password is missing!" };
  }
  if (password.length < PASS_LENGTH) {
    return { ok: false, error: `Password must be ${PASS_LENGTH} characters!` };
  }

  return { ok: true };
};

export default function GuestSignUpForm({ className, setOpen, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, isLoading } = useSignup();
  const { state } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return toast.error(error as string);

    signup(
      { fullName: userInfo.name, email: userInfo.email, password: userInfo.password },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to sign up");
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col gap-6 p-4", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{"Welcome"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>{"Full Name"}</Label>
                  <Input
                    id='name'
                    type='text'
                    placeholder={"John Doe"}
                    required
                    name='name'
                    onChange={handleChange}
                    value={userInfo.name}
                    disabled={isLoading}
                  />
                  <Label htmlFor='email'>{"Email"}</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                    onChange={handleChange}
                    name='email'
                    value={userInfo.email}
                    disabled={isLoading}
                    // defaultValue={state?.email || ""}
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>{"Password"}</Label>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    required
                    placeholder='****************'
                    name='password'
                    onChange={handleChange}
                    value={userInfo.password}
                    disabled={isLoading}
                  />
                </div>
                <Button type='submit' className='w-full bg-cRed-500 hover:bg-cRed-600' disabled={isLoading}>
                  {"Create New User"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
