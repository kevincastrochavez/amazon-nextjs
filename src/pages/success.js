import { CheckCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

import Header from '../components/Header';

function Success() {
  const router = useRouter();

  return (
    <div className='bg-gray-100 h-screen'>
      <Header />

      <main className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col p-10 bg-white'>
          <div className='flex item-container space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-500 h-10' />
            <h1 className='text-3xl'>Your order has been confirmed</h1>
          </div>

          <p>
            Than you for shopping with us. We'll send a confirmation email when
            the item has shipped
          </p>

          <button
            onClick={() => router.push('/orders')}
            className='button mt-8'
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
