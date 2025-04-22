import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPass } from "./useResetPass";
import { PASS_LENGTH } from "@/utils/constants";
import { useTranslation } from "react-i18next";

function ResetPassForm() {
  const { uid, token } = useParams();
  const { t } = useTranslation();

  const { resetPass, isLoading } = useResetPass();
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onSubmit({ password }) {
    resetPass(
      { uid, token, password },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["user"]);
          navigate("/admin");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='border py-6 px-8 rounded-md flex flex-col gap-4 '>
      <div>
        <Label htmlFor='password'>{t("password")}</Label>
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: PASS_LENGTH,
              message: `Password needs a minimum of ${PASS_LENGTH} characters`,
            },
          })}
        />
        <p className='text-cRed-500 text-sm'>{errors?.password?.message}</p>
      </div>

      <div>
        <Label htmlFor='passwordConfirm'>{t("repeatPassword")}</Label>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Passwords need to match",
          })}
        />
        <p className='text-cRed-500 text-sm'>{errors?.passwordConfirm?.message}</p>
      </div>

      <div>
        <Button className='bg-cBrand-500 hover:bg-cBrand-600' disabled={isLoading}>
          {t("submitButton")}
        </Button>
      </div>
    </form>
  );
}

export default ResetPassForm;
