import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Currency from 'react-currency-formatter';

import Header from '../components/Header';
import { selectItems } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';

function Checkout() {
  const items = useSelector(selectItems);

  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? 'Your Shopping Basket is empty'
                : 'Shopping basket'}
            </h1>

            {items.map(
              (
                {
                  id,
                  title,
                  price,
                  rating,
                  description,
                  category,
                  image,
                  hasPrime,
                },
                i
              ) => (
                <CheckoutProduct
                  key={i}
                  id={id}
                  title={title}
                  price={price}
                  rating={rating}
                  description={description}
                  category={category}
                  image={image}
                  hasPrime={hasPrime}
                />
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
