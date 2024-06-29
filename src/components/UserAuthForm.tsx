"use client"

import { FC, useState } from "react";
import { Button } from "./ui/Button";
// import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "../hooks/use-toast"
import { ToastAction } from "./ui/Toast";

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {toast} = useToast()

  const googleLogin = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      //toast notification
      toast({
        title:'Error logging in',
        description:'There was an error logging in with google',
        variant: 'destructive',
        action: <ToastAction altText="Try again">Try again</ToastAction>
      })
    } finally {
      setIsLoading(false);

    }
  };
  return (
    <div className="flex justify-center">
      <Button
        onClick={googleLogin}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading? null: <Icons.google className="h-4 w-4 mr-2"/>}
        Google Auth
      </Button>
    </div>
  );
};

export default UserAuthForm;
