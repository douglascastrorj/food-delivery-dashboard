'use client'

import React, { useEffect } from 'react'
import MealList from '@/components/MealList';
import { IMeal } from '@/models/meal';
import { AddMealDialog } from '@/components/AddMealDialog';
import { useSession } from 'next-auth/react';

export default function MealsPage() {

    const [meals, setMeals] = React.useState<IMeal[]>([]);
    const {data: session} = useSession();

    useEffect(() => {
        const listMeals = async () => {
            try {
                const userId = session?.user?.email;
                const res = await fetch('/api/meal/' + userId);
                console.log('meals', res)
                const data = await res.json();
                console.log(data)
                setMeals(data);
            } catch(e) {
                console.error(e);
            }
        }
        listMeals();
    }, []);
    return (
        <div className="flex flex-col p-4 w-full h-full gap-2">
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">Meals</h1>
                </div>
                <button className='bg-gradient text-white rounded-xl flex justify-center items-center w-[300px] h-12 hover:shadow-lg hover:shadow-neutral-700'>
                  <AddMealDialog />
                </button>
            </div>

            <MealList meals={meals}/>
        </div>
    )
}
