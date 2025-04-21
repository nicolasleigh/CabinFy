import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { isValidEmail } from "@/utils/helpers";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
              <span className='bg-cRed-100 text-cRed-500 px-1 rounded-sm'>{t("admin")}</span> {t("login")}
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-6'>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>{t("emailAddress")}</Label>
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
                    <Label htmlFor='password'>{t("password")}</Label>
                    <Link
                      to='/admin/forget-password'
                      className='ml-auto text-sm underline-offset-4 underline hover:no-underline'
                      tabIndex={1}
                    >
                      {t("forgotPassword")}
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
                  {t("login")}
                </Button>
              </div>
              <div className='text-sm '>
                {t("dontHaveAccount")}
                <Link to='/admin/signup ' className='ml-auto text-sm underline-offset-4 underline hover:no-underline'>
                  {t("clickSignup")}
                </Link>
              </div>
              <div className='text-sm '>
                <Link to='/home' className='ml-auto text-sm underline-offset-4 underline hover:no-underline'>
                  {t("backToGuestPage")}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
