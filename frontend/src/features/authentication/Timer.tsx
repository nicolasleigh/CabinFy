import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Timer({ setDisableBtn }) {
  const [countdown, setCountdown] = useState(60);

  const minutes = Math.floor(countdown / 60);
  const seconds = Math.floor(countdown % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      setDisableBtn(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);
  return (
    <>
      <Button disabled={true}>
        Send password reset link
        <div>
          {minutes}:{seconds}
        </div>
      </Button>
    </>
  );
}
