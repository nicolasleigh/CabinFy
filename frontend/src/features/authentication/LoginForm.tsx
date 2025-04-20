import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "@/utils/helpers";
import toast from "react-hot-toast";
import { useLogin } from "./useLogin";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) {
    return { ok: false, error: "Email is missing!" };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Invalid email!" };
  }

  if (!password.trim()) {
    return { ok: false, error: "Password is missing!" };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be 8 characters!" };
  }
  return { ok: true };
};

export default function LoginForm({
  className,
  title,
  defaultEmail,
  defaultPass,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // const [email, setEmail] = useState('nicolas.leigh@qq.com');
  // const [password, setPassword] = useState('1234');
  const [userInfo, setUserInfo] = useState({
    email: defaultEmail,
    password: defaultPass,
  });
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return toast.error(error as string);
    login(
      { email: userInfo.email, password: userInfo.password },
      {
        // onSettled: () => {
        //   setEmail('');
        //   setPassword('');
        // },
      }
    );
  }

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            <h2 className='text-2xl font-semibold text-center'>
              <span className='bg-cRed-100 text-cRed-500 px-1 rounded-sm'>Admin</span> Login
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>{"Email"}</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    required
                    value={userInfo.email || defaultEmail}
                    onChange={handleChange}
                    name='email'
                    disabled={isLoading}
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>{"Password"}</Label>
                    <Link
                      to='/admin/forget-password'
                      className='ml-auto text-sm underline-offset-4 underline hover:no-underline'
                      tabIndex={1}
                    >
                      {"Forgot your password?"}
                    </Link>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    required
                    placeholder='****************'
                    value={userInfo.password || defaultPass}
                    onChange={handleChange}
                    name='password'
                    disabled={isLoading}
                  />
                </div>
                <Button type='submit' className='w-full bg-cBrand-500 hover:bg-cBrand-600'>
                  {"Login"}
                </Button>
              </div>
              <div className='text-sm '>
                {`Don't have an account? `}
                <Link to='/admin/signup ' className='ml-auto text-sm underline-offset-4 underline hover:no-underline'>
                  {"Click here to sign up"}
                </Link>
              </div>
              <div className='text-sm '>
                <Link to='/home' className='ml-auto text-sm underline-offset-4 underline hover:no-underline'>
                  Back to guest page
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
