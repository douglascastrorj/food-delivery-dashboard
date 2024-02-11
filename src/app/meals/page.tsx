'use client'

import React, { useCallback, useEffect } from 'react'
import MealList from '@/components/MealList';
import { AddMealDialog } from '@/components/AddMealDialog';
import { IMeal } from '@/models/meal';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";



export default function MealsPage() {

    const router = useRouter();
    const [meals, setMeals] = React.useState<IMeal[]>([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = searchParams.get('page') || '1';
    const limit = 2;

    const [lastPage, setLastPage] = React.useState(1);

    const listMeals = async () => {
        try {
            // const userId = session?.user?.email;
            const res = await fetch(`/api/meal?limit=${limit}&page=${page}`);
            const data = await res.json();
            setMeals(data.meals);
            setLastPage(Math.ceil(data.count / limit));
        } catch (e) {
            console.error(e);
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

                <MealList meals={meals} onDelete={onDelete} onEdit={onEdit} />

                <MealListPagination
                    page={parseInt(page)}
                    limit={limit}
                    totalPages={lastPage}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            </div>
        </div>
    )
}



interface MealListPaginationProps {
    page: number;
    limit: number;
    totalPages: number;
    onNext: () => void;
    onPrevious: () => void;
}

export function MealListPagination(props: MealListPaginationProps) {
    const { page, totalPages } = props;
    const nextButtonDisabled = page === totalPages;
    const previousButtonDisabled = page === 1;

    const disabledButtonStyle = 'text-gray-500 hover:text-gray-500 cursor-not-allowed';

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <div className={previousButtonDisabled ? disabledButtonStyle : ''}>
                        <PaginationPrevious onClick={props.onPrevious} href="#" />
                    </div>
                </PaginationItem>
                {/* <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem> */}

                <PaginationItem>
                    <div className={nextButtonDisabled ? disabledButtonStyle : ''}>
                        <PaginationNext onClick={props.onNext} href="#" />
                    </div>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}