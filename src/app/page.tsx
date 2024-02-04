'use client'

import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, []);
  
  return (
    <main className="w-full h-full flex-col justify-center p-4">
      <div className="flex flex-col gap-4 justify-center items-center md:pt-12 pt-8">
        <h1 className="text-gradient text-5xl font-bold flex w-auto text-center">Food Delivery Dashboards</h1>
        <p className="flex md:w-[600px] text-lg text-center">Build your own dashboards, analyze your customer's preferences on your products and get insights about your business.</p>
      </div>

      <div className="flex justify-center items-center mt-12">
        <LoginForm />
      </div>
    </main>
  );
}
