'use client'
import { upload } from '@/app/actions/upload';

import { supabase } from '@/lib/supabase'
import React, {useEffect} from 'react'

export default function OrdersPage() {

  const [image, setImage] = React.useState(null)
  const [uploading, setUploading] = React.useState(false)


  async function uploadAvatar(event: any) {
    try {
      setUploading(true)
      let formData = new FormData();
      formData.append('file', event.target.files[0])
      const { response, error } = await upload(formData)
      console.log(response)
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

            {/* <form > */}
              <input name='file' type="file" accept="image/*"
                      onChange={uploadAvatar}
                      disabled={uploading} 
              />
              <button type="submit">Upload</button>
            {/* </form> */}
        </div>
    </div>
  )
}
