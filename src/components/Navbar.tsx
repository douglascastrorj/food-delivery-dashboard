'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function Navbar() {
  const { update, data, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/')
    }
  }, [status]);

  const logout = () => {
    signOut();
  }

  return (
    <nav className='border-b-2 border-neutral-800 w-full p-4 flex justify-between items-center'>
      <div className='flex gap-2'>

        <Link href={'/dashboard'}>
          <FastfoodOutlinedIcon width={24} />
        </Link>

        {status === 'authenticated' &&
          <ul className='flex space-x-2'>
            <li className='px-2 border-r-2 border-neutral-800'><Link href={'/dashboard'}> Dashboard </Link></li>
            <li className='px-2 border-r-2 border-neutral-800'><Link href={'/orders'}> Orders </Link></li>
            <li className='px-2 border-r-2 border-neutral-800'><Link href={'/meals'}> Meals </Link></li>
          </ul>
        }

      </div>
      {
        status === 'authenticated' && (
          <Sheet>
            <SheetTrigger asChild>
              <div className='flex space-x-2'>
                <div className='w-12 h-12 rounded-full bg-zinc-800 text-purple-600 flex justify-center items-center'>
                  <span>{data?.user?.email?.[0].toUpperCase()}</span>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent>
              <div className='flex items-center justify-center pb-12 cursor-pointer' title='Upload Image'>
                <div className='w-24 h-24 rounded-full bg-zinc-800 text-purple-600 flex justify-center items-center'>
                  <span>{data?.user?.email[0].toUpperCase()}</span>
                </div>
              </div>

              <div className="grid gap-4 py-4">
                <div>
                  <h3 className='font-semibold text-2xl text-left mb-4'>Account</h3>
                  <ul className='flex flex-col text-sm'>
                    <li className='hover:bg-neutral-800 p-2 cursor-pointer'> Change Password </li>
                    <li className='hover:bg-neutral-800 p-2 cursor-pointer'> Edit Profile </li>
                  </ul>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <div className='flex items-center justify-center w-full'>
                    <button onClick={logout} className='w-[300px] h-12 border-neutral-200 border bg-transparent text-neutral-200 p-2 mt-4 rounded-xl'>Logout</button>
                  </div>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )
      }
    </nav>
  )
}
