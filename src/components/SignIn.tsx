import { Link } from "lucide-react";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";


const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {" "}
          Welcome back, Friend
        </h1>
        <p className="text-sm max-w-xs">
          random terms and services example yesl;slkmsxklxsaklsx
        </p>
        {/* signin form */}
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
          New Here?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm uderline underline-offset-4"
          >
            Sign-up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
