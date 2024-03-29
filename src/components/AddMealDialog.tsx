'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddIcon from '@mui/icons-material/Add';
import AddMealForm, { MealFormInput } from "./AddMealForm";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { IMeal } from "@/models/meal";

interface AddMealDialogProps {
    onAdd?: (meal: IMeal) => void;
}

export function AddMealDialog(props: AddMealDialogProps) {    

    const myRef = useRef<HTMLSpanElement>(null);
    const {data: session, status} = useSession();

    const onSubmit = async (data: MealFormInput) => {
        if(status !== 'authenticated') return;
        
        const user = session?.user
        const res = await fetch('/api/meal', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...data, email: user?.email})
        });

        const meal = await res.json();
        if(props.onAdd) props.onAdd(meal);
        myRef.current?.click();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='bg-gradient text-white rounded-xl flex justify-center items-center w-[300px] h-12 hover:shadow-lg hover:shadow-neutral-700'>
                    <AddIcon />  <span className='font-semibold'>Add Meal</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Meal</DialogTitle>
                    <DialogDescription>
                        Register your meal by filling the form below
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <AddMealForm callback={onSubmit} />
                    <DialogClose asChild>
                        <div className="hidden">
                            <span ref={myRef}> Cancelar </span>
                        </div>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
