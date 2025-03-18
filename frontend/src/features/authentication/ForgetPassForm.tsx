import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
// import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
// import Input from "../../ui/Input";
import Timer from "./Timer";
import { useForgetPass } from "./useForgetPass";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isValidEmail } from "@/utils/helpers";

export default function ForgetPassForm() {
  const { state } = useLocation();
  const [email, setEmail] = useState(state?.email || "");
  const [disableBtn, setDisableBtn] = useState(false);

  const { forgetPass, isLoading } = useForgetPass();

  const validate = (email) => {
    if (!email.trim()) {
      return { ok: false, error: "Email is missing!" };
    }
    if (!isValidEmail(email)) {
      return { ok: false, error: "Invalid email!" };
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { ok, error } = validate(email);
    if (!ok) return toast.error(error as string);

    forgetPass({ email });
    setDisableBtn(true);
    toast.success("Password reset link has been sent to your email address", { duration: 8000 });
  }

  return (
    <form onSubmit={handleSubmit} className='mt-6 border py-6 px-8 rounded-md'>
      <div className='flex flex-col gap-2 mb-5'>
        <Label htmlFor='email'>Email Address</Label>
        <Input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={disableBtn} />
      </div>

      <div className='mb-3'>
        {disableBtn ? (
          <Timer setDisableBtn={setDisableBtn} />
        ) : (
          <Button className='bg-cBrand-500 hover:bg-cBrand-600' disabled={disableBtn}>
            Send password reset link
          </Button>
        )}
      </div>
      <Link className='text-sm underline hover:no-underline ' to='/admin/dashboard'>
        Go back
      </Link>
    </form>
  );
}
