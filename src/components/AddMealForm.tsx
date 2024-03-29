'use client'

import React from 'react'
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"
import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { upload } from '@/app/actions/upload';
import { ReloadIcon } from '@radix-ui/react-icons';


const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type _FileList = any[];

const mealSchema = z.object({
    name: z.string().nonempty('Meal name is required'),
    description: z.string().nonempty('Meal description is required'),
    price: z.coerce.number().multipleOf(0.01).min(0.1, 'Price must be greater than 0'),
    image: z.any()
    .transform((files: any) => files?.[0])
    .refine((file: File) => file != null && file != undefined, `Image is required.`)
    .refine((file: File) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
    imagePath: z.string().optional()
});

export type MealFormInput = z.infer<typeof mealSchema>;

interface AddMealFormProps {
    callback: (data: MealFormInput) => void;
}

export default function AddMealForm(props: AddMealFormProps) {

    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<MealFormInput>({
        resolver: zodResolver(mealSchema)
    });

    const onSubmit: SubmitHandler<MealFormInput> = async (data: MealFormInput) => {

        setLoading(true);

        const formData = new FormData();
        formData.append('file', data.image);
        formData.append('folder', 'files');

        const { response, error }: {response: any, error: any} = await upload(formData)
        
        if(response) {
            const path = response.fullPath;
            if(props.callback) await props.callback({...data, imagePath: path});   
            setLoading(false);
        } if (error) {
            console.log(error)
            setLoading(false);
        }
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

                <div className='flex flex-col gap justify-center'>
                    <label htmlFor="image" className='text-sm text-neutral-400 font-semibold'> Image </label>
                    <input {...register('image')} type="file" placeholder="Image" className='w-full bg-neutral-900 text-white p-4' />
                    {errors.image && <p className='text-red-500 w-full'>{errors.image.message}</p>}
                </div>

                <button disabled={loading} type='submit' className='w-full h-12 bg-purple-500 text-white p-2 mt-4 rounded-md self-center flex gap justify-center items-center disabled:bg-neutral-500'> 
                    {loading && <ReloadIcon className='w-5 h-5 animate-spin mr-2' />}
                    Create Meal 
                </button>
            </form>

        </div>
    )
}
