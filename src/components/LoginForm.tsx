'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// creating a schema for strings
const registerSchema = z.object({
    email: z.string().nonempty('email is required').email(),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    confirmPassword: z.string().min(4, 'Password must be at least 4 characters long')
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The passwords did not match"
      });
    }
});


const loginSchema = z.object({
    email: z.string().nonempty('email is required').email(),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
})


type LoginFormInput = {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function LoginForm() {
    
    const router = useRouter();

    const [isRegister, setIsRegister] = React.useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormInput>({
        resolver: isRegister ? zodResolver(registerSchema) : zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        if (isRegister) createAccount(data);
        else login(data);
    }

    const createAccount =  async (data: LoginFormInput) => {

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
    
            setIsRegister(false);        
        } catch(e) {
            console.error(e);
        }
    }

    const login =  async (data: LoginFormInput) => {
        try {
            const res = await signIn('credentials', {
              email: data.email,
              password: data.password,
              redirect: false,
              callbackUrl: '/'
            })
            console.log('login',res)

            if(res?.ok) router.push('/dashboard');
          } catch (e) {
            console.log(e);
          }
    }

    const toggleIsRegister = () => {
        setIsRegister( _isRegister => !_isRegister);
    }

    return (
        <div className='border-2 border-neutral-800 p-8 rounded-lg'>
            <h1 className='text-3xl font-bold text-center mb-8'>{ isRegister ? 'Register' : 'Sign in'}</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 justify-center'
            >
                <div className='flex flex-col gap-1'>
                    <input {...register('email')} type="text" placeholder="Email" className='w-[300px] h-12 bg-neutral-900 text-white p-4 rounded-md' />
                    {errors.email && <p className='text-red-500 w-[300px]'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <input {...register('password')} type="password" placeholder="Password" className='w-[300px] h-12 bg-neutral-900 text-white p-4 rounded-md' />
                    {errors.password && <p className='text-red-500 w-[300px]'>{errors.password.message}</p>}
                </div>
                
                {
                    isRegister && (
                        <div className='flex flex-col gap-1'>
                            <input {...register('confirmPassword')} type="password" placeholder="Confirm your password" className='w-[300px] h-12 bg-neutral-900 text-white p-4 rounded-md' />
                            {errors.confirmPassword && <p className='text-red-500 w-[300px]'>{errors.confirmPassword.message}</p>}
                        </div>
                    )
                }
                <button type='submit' className='w-[300px] h-12 bg-purple-500 text-white p-2 mt-4 rounded-md'>{ isRegister ? 'Register' : 'Sign in' } </button>
            </form>

            <div className='mt-8 flex flex-col items-center text-xs gap-2'>
                <span> {isRegister ? 'Already have an account?': 'Do not have an account?'} </span>
                <span className='cursor-pointer hover:underline' onClick={toggleIsRegister}>{ isRegister ? 'Login' : 'Register' }</span>
            </div>
        </div>
    )
}