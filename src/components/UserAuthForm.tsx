// "use client"

// import { FC, useState } from "react";
// import { Button } from "./ui/Button";
// // import { cn } from "@/lib/utils";
// import { signIn } from "next-auth/react";
// import { Icons } from "./Icons";
// import { useToast } from "../hooks/use-toast"
// import { ToastAction } from "./ui/Toast";
// import {Input} from "./ui/Input";

// const UserAuthForm = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const {toast} = useToast()

//   const googleLogin = async () => {
//     setIsLoading(true);

//     try {
//       await signIn("google");
//     } catch (error) {
//       //toast notification
//       toast({
//         title:'Error logging in',
//         description:'There was an error logging in with google',
//         variant: 'destructive',
//         action: <ToastAction altText="Try again">Try again</ToastAction>
//       })
//     } finally {
//       setIsLoading(false);

//     }
//   };
//   return (
//     <div className="flex justify-center">

//       {/* <Input/>
//       <Input /> */}

//       <Button
//         onClick={googleLogin}
//         isLoading={isLoading}
//         size="sm"
//         className="w-full"
//       >
//         {isLoading? null: <Icons.google className="h-4 w-4 mr-2"/>}
//         Google Auth
//       </Button>
//     </div>
//   );
// };

// export default UserAuthForm;

"use client";

import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "./ui/Toast";
import { Input } from "./ui/Input";

const UserAuthForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const googleLogin = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error logging in",
        description: "There was an error logging in with Google",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const discordLogin = async () => {
    setIsLoading(true);

    try {
      await signIn("discord");
    } catch (error) {
      toast({
        title: "Error logging in",
        description: "There was an error logging in with Discord",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const githubLogin = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "Error logging in",
        description: "There was an error logging in with GitHub",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Input placeholder="Email" type="email" className="w-full" />
      <Input placeholder="Password" type="password" className="w-full" />
      <div className="flex space-x-2">
        <Button onClick={googleLogin} isLoading={isLoading} size="sm" className="flex-1">
          {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
          Google
        </Button>
        <Button onClick={discordLogin} isLoading={isLoading} size="sm" className="flex-1">
          {isLoading ? null : <Icons.discord className="h-4 w-4 mr-2" />}
          Discord
        </Button>
        <Button onClick={githubLogin} isLoading={isLoading} size="sm" className="flex-1">
          {isLoading ? null : <Icons.github className="h-4 w-4 mr-2" />}
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default UserAuthForm;

