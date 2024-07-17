import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Lonely-Together",
  description: "Title Pending",
};

//custom font
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
  
        <Providers>
          <></>
        {/* @ts-expect-error Server Component */}
        <Navbar />
        {authModal}

        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>

        <Toaster />
       
        </Providers>
        
      </body>
    </html>
  );
}
//will always exist in ur nextJS application
