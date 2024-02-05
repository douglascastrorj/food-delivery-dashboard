'use client'

import { supabase } from '@/lib/supabase'
import React, {useEffect} from 'react'

export default function OrdersPage() {

  const [image, setImage] = React.useState(null)
  const [uploading, setUploading] = React.useState(false)


  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error } = await supabase.storage
          .from('food-delivery-restaurants/profile')
          .upload(`profile_${file.name}`, file);

      console.log(data, error)
      if (error) {
        throw error
      }

    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    const getTeste = async () => {
      const response = await fetch('/api/teste')
      const data = await response.json()
      console.log(data)
    }
    getTeste();

  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-24">
        <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-lg">Find and manage your Orders</p>

            <input type="file" accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading} />
        </div>
    </div>
  )
}
