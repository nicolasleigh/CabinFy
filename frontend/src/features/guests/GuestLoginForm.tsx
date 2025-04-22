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
import { useTranslation } from "react-i18next";

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

export default function GuestLoginForm({
  className,
  title,
  defaultEmail = "guest@e.com",
  defaultPass = "123123123",
  setOpen,
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
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  }

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className={cn("p-2", className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>{title as string}</CardTitle>
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
                  <Label htmlFor='password'>{t("password")}</Label>
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
                <Button type='submit' className='w-full bg-cRed-500 hover:bg-cRed-600'>
                  {t("login")}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
