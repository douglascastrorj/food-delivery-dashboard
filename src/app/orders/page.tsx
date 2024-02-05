'use client'

import React, {useEffect} from 'react'

export default function OrdersPage() {

  useEffect(() => {
    const getTeste = async () => {
      const response = await fetch('/api/teste')
      const data = await response.json()
      console.log(data)
    }
    getTeste()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-24">
        <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-lg">Find and manage your Orders</p>
        </div>
    </div>
  )
}
