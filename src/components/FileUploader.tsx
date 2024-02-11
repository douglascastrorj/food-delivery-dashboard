'use client'

import { upload } from '@/app/actions/upload';


import { useState } from "react"

interface FileUploaderProps {
    folder: string;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
}

export const FileUploader = ({ folder = 'files', onError, onSuccess }: FileUploaderProps) => {

    
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState<any>(null)
  
    const updateFile = (event: any) => {
      event.preventDefault()
      setFile(event.target.files[0]);
    }
  
    async function uploadFile() {
      try {
        setUploading(true)

        let formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        const { response, error } = await upload(formData);

        console.log(response)

       if(error && onError) onError(error);
       else if(!error && onSuccess) onSuccess(response);
        
      } catch (error: any) {
        if(onError) onError(error)
      } finally {
        setUploading(false)
      }
    }

    return (
        <div>
            <input 
               name='file' 
               type="file"                
               accept="image/*"
               onChange={updateFile}
               disabled={uploading} 
            />
           <button onClick={uploadFile}>Upload</button>
        </div>
    )

}