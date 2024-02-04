import React from 'react'
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

const mealSchema = z.object({
    name: z.string().nonempty('Meal name is required'),
    description: z.string().nonempty('Meal description is required'),
    price: z.coerce.number().min(0.1, 'Price must be greater than 0'),
    image: z.string(),
});

type MealFormInput = {
    name: string;
    description: string;
    price: number;
    image: string;
}


export default function AddMealForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<MealFormInput>({
        resolver: zodResolver(mealSchema)
    });

    const onSubmit: SubmitHandler<MealFormInput> = (data) => {
        console.log(data)
    }

    return (
        <div className='padding-8'>

            <form className='flex flex-col gap-4 justify-center'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='text-sm text-neutral-400 font-semibold'> Name </label>
                    <input {...register('name')} type="text" placeholder="Name" className='w-full h-12 bg-neutral-900 text-white p-4 rounded-md' />
                    {errors.name && <p className='text-red-500 w-full'>{errors.name.message}</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="description" className='text-sm text-neutral-400 font-semibold'> Description </label>
                    <textarea {...register('description')} cols={200} rows={4} placeholder="Description" className='w-full bg-neutral-900 text-white p-4 rounded-md' />
                    {errors.description && <p className='text-red-500 w-full'>{errors.description.message}</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="price" className='text-sm text-neutral-400 font-semibold'> Price </label>
                    <input {...register('price')} type="number" min={0} placeholder="Price" className='w-full h-12 bg-neutral-900 text-white p-4 rounded-md' />
                    {errors.price && <p className='text-red-500 w-full'>{errors.price.message}</p>}
                </div>

                <button type='submit' className='w-full h-12 bg-purple-500 text-white p-2 mt-4 rounded-md self-center'> Create Meal </button>
            </form>

        </div>
    )
}
