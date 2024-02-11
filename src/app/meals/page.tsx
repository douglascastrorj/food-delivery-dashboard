'use client'

import React, { useCallback, useEffect } from 'react'
import MealList from '@/components/MealList';
import { AddMealDialog } from '@/components/AddMealDialog';
import { IMeal } from '@/models/meal';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CustomPagination } from '@/components/CustomPagination';


export default function MealsPage() {

    const router = useRouter();
    const [meals, setMeals] = React.useState<IMeal[]>([]);
    const [loading, setLoading] = React.useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = searchParams.get('page') || '1';
    const limit = 5;

    const [lastPage, setLastPage] = React.useState(1);

    const listMeals = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/meal?limit=${limit}&page=${page}`);
            const data = await res.json();
            setMeals(data.meals);
            setLastPage(Math.ceil(data.count / limit));
            // setTimeout(() => setLoading(false), 2000);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        listMeals();
    }, [page]);

    const handleNext = () => {
        const newPage = parseInt(page) + 1;
        if (newPage > lastPage) return;
        router.push(`${pathname}?page=${newPage}`);
    }

    const handlePrevious = () => {
        const newPage = Math.max(parseInt(page) - 1, 1);
        if (newPage < 1) return;
        router.push(`${pathname}?page=${newPage}`);
    }

    const handleSelectPage = (page: number) => {
        router.push(`${pathname}?page=${page}`);
    }

    const onAdd = (meal: IMeal) => {
        setMeals([...meals, meal]);
    }

    const onDelete = async (id: string) => {
        console.log('delete', id);
        await fetch(`/api/meal/${id}`, {
            method: 'DELETE'
        });
        setMeals(meals.filter(meal => meal._id !== id));
    }

    const onEdit = async (id: string) => {
        console.log('edit', id);
    }

    return (
        <div className="flex flex-col p-4 w-full h-full gap-2">
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className="text-4xl font-bold text-gradient mb-2">Meals</h1>
                </div>
                <AddMealDialog onAdd={onAdd} />
            </div>

            <div className='flex flex-col gap-4'>

                <MealList loading={loading} meals={meals} onDelete={onDelete} onEdit={onEdit} />

                <CustomPagination
                    page={parseInt(page)}
                    limit={limit}
                    totalPages={lastPage}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onSelectPage={handleSelectPage}
                />
            </div>
        </div>
    )
}



