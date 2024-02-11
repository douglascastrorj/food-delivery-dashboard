'use client'
import React from 'react'
import { IMeal } from '../models/meal';
import Image from 'next/image';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Skeleton } from './ui/skeleton';

interface IMealListProps {
    meals: IMeal[];
    loading: boolean;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export default function MealList(props: IMealListProps) {

    const { meals, loading } = props;

    return (
        <div className='flex flex-col gap-8'>

            <Table className='bg-transparent'>
                <TableHeader>
                    <TableRow className='hover:bg-transparent bg-transparent'>
                        <TableHead className="w-[100px] text-center">Meal</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead> Actions </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading == false ?
                        meals.map((meal, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex justify-center h-14">
                                    {meal.image && <Image className='rounded-xl' alt={meal.name} src={meal.image} width={56} height={56} />} </TableCell>
                                <TableCell className='h-14'>{meal.name}</TableCell>
                                <TableCell className='h-14'>{meal.description}</TableCell>
                                <TableCell className='h-14'>{meal.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                                <TableCell className='h-14'>
                                    <div className='flex gap-4'>
                                        <Pencil2Icon
                                            onClick={() => props.onEdit(meal._id)}
                                            className="w-5 h-5 text-neutral-400 cursor-pointer" />
                                        <TrashIcon
                                            onClick={() => props.onDelete(meal._id)}
                                            className="w-5 h-5 text-neutral-400 cursor-pointer" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                        : Array.from({ length: 5 }, (_, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex justify-center">
                                    <Skeleton className="h-14 w-14 rounded-xl bg-neutral-700" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[200px] h-[20px] bg-neutral-700" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-full h-[20px] bg-neutral-700" />                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[100px] h-[20px] bg-neutral-700" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-[100px] h-[20px] bg-neutral-700" />
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>

        </div>
    )
}
