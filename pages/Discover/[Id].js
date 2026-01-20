import { useRouter } from 'next/router'
import React from 'react'

function TripDetailPage() {
    const router = useRouter();
    const { Id , name , city , image , description, rating, category } = router.query;
    
  return (
    <main className='mt-50 max-w-7xl mx-auto mb-20'>
      <h1 className='text-4xl font-bold px-5 mb-5'>Trip Detail Page - {Id}</h1>
      <p className='text-xl font-medium'>
        This is the detail page for trip with ID: {name}
      </p>
    </main>
  )
}

export default TripDetailPage