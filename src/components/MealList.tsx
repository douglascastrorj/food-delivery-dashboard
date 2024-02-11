'use client'
import React from 'react'
import { IMeal } from '../models/meal';
import Image from 'next/image';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

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

interface IMealListProps {
    meals: IMeal[];
}

export default function MealList(props: IMealListProps) {

    const { meals } = props;

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
                    {meals.map((meal, index) => (
                        <TableRow key={index}>
                            <TableCell className="flex justify-center">
                                {meal.image && <Image className='rounded-xl' alt={meal.name} src={meal.image} width={40} height={40} />} </TableCell>
                            <TableCell>{meal.name}</TableCell>
                            <TableCell>{meal.description}</TableCell>
                            <TableCell>{meal.price}</TableCell>
                            <TableCell>
                                <div className='flex gap-4'>
                                    <Pencil2Icon className="w-5 h-5 text-neutral-400 cursor-pointer" />
                                    <TrashIcon className="w-5 h-5 text-neutral-400 cursor-pointer" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            <MealListPagination />
        </div>
    )
}


export function MealListPagination() {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
