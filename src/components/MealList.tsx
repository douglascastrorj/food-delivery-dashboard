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

interface IMealListProps {
    meals: IMeal[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
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
                            <TableCell>{meal.price.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</TableCell>
                            <TableCell>
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
                    ))}
                </TableBody>

            </Table>

        </div>
    )
}
