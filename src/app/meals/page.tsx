'use client'

import React, { useEffect } from 'react'
import MealList from '@/components/MealList';
import { AddMealDialog } from '@/components/AddMealDialog';
import { IMeal } from '@/models/meal';

export default function MealsPage() {

    const [meals, setMeals] = React.useState<IMeal[]>([]);

    useEffect(() => {
        const listMeals = async () => {
            try {
                // const userId = session?.user?.email;
                const res = await fetch('/api/meal');
                const data = await res.json();
                setMeals(data);
            } catch(e) {
                console.error(e);
            }
        }
        listMeals();
    }, []);

    const onAdd = (meal: IMeal) => {
        setMeals([...meals, meal]);
    }

    return (
        <div className="flex flex-col p-4 w-full h-full gap-2">
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">Meals</h1>
                </div>
                <AddMealDialog onAdd={onAdd} />
            </div>

            <MealList meals={meals} />
        </div>
    )
}
