import React, { useEffect } from 'react'
import { IMeal } from '../models/meal';
import Image from 'next/image';

interface MealListProps {
    meals: IMeal[]
}

export default function MealList(props: MealListProps) {

    const { meals } = props;
    return (
        <div className='flex gap-4 flex-col flex-nowrap justify-center items-center md:flex-wrap md:flex-row md:justify-start'>
            {
                meals.map((meal: IMeal) => (
                    <MealCard key={meal.id} meal={meal} />
                ))
            }
        </div>
    )
}

const MealCard = (props: { meal: IMeal }) => {
    const meal = props.meal;
    return (
        <div className='rounded-lg shadow-lg mb-4 border border-neutral-600 w-[300px] h-[350px] rounded-xl flex flex-col relative overflow-hidden'>
            {meal.image && <Image className='absolute top-0' width={400} height={200} src={meal.image} alt={meal.name}/>}
            <div className='p-4 absolute top-[200px] bg-neutral-950 w-full h-full'>
                <h1 className='text-2xl font-semibold text-neutral-200'>{meal.name}</h1>
                <p className='text-neutral-400'>{meal.description}</p>
                <span className='text-neutral-200 font-bold text-xl mt-4'>
                    R$ { meal.price.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </span>
            </div>
            
        </div>
    )
}