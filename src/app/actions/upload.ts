'use server'

import { supabase } from "@/lib/supabase";

export const upload = async (data: FormData) => {
    console.log(data)

    const file = data.get('file') as File;
    const folder = data.get('folder') as string;

    const fileName = `${new Date().getTime()}_${file.name}`;

    const { data: uploadRes, error } = await supabase.storage
    .from(`food-delivery-restaurants/${data.has('folder') ? folder : 'files'}`)
    .upload(`${fileName}`, file);

    return { response: uploadRes, error}
}