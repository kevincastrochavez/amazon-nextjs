import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Currency from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import Header from '../components/Header';
import { selectItems, selectTotal } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post(
      'https://next-server-cvwel6gtv-kevincastrochavez.vercel.app/api/create-checkout-session',
      {
        items,
      }
    );
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

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

        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({items.length} items): {''}
                <span className='font-bold'>
                  <Currency quantity={total} />
                </span>
              </h2>

              <button
                onClick={createCheckoutSession}
                role='link'
                className='button mt-2'
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
