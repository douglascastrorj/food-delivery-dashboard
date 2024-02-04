'use client'

import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import MealList from '@/components/MealList';
import { IMeal } from '@/models/meal';
import { AddMealDialog } from '@/components/AddMealDialog';

export default function MealsPage() {

    const meals: IMeal[]= [
        {id: '1', name: 'Spaghetti', description: 'Spaghetti with meatballs', price: 9.9, image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'},
        {id: '2', name: 'Fried Rice', description: 'Fried rice with chicken', price: 9.9, image: 'https://images.unsplash.com/photo-1550304952-9d1e3444f713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'},
        {id: '3', name: 'Jollof Rice', description: 'Jollof rice with fried plantain', price: 9.9, image: 'https://images.unsplash.com/photo-1558672367-241cd1a01b16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80'},
    ]

    return (
        <div className="flex flex-col p-4 w-full h-full gap-2">
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">Meals</h1>
                </div>
                <button className='bg-gradient text-white rounded-xl flex justify-center items-center w-[300px] h-12 hover:shadow-lg hover:shadow-neutral-700'>
                  {/* <AddIcon />  <span className='font-semibold'>Add Meal</span> */}
                  <AddMealDialog />
                </button>
            </div>

            <MealList meals={meals}/>
        </div>
    )
}
