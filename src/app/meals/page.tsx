
import React, { useEffect } from 'react'
import MealList from '@/components/MealList';
import { AddMealDialog } from '@/components/AddMealDialog';

export default function MealsPage() {

    return (
        <div className="flex flex-col p-4 w-full h-full gap-2">
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">Meals</h1>
                </div>
                <AddMealDialog />
            </div>

            <MealList />
        </div>
    )
}
