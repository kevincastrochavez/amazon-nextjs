import React from 'react';
import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/outline';

function Header() {
  return (
    <header>
      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
            src='https://links.papareact.com/f90'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>

        <div className='flex items-center h-full rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
          <input
            className='p-2 h-12 w-6 flex-grow flex-shrink rounded-l-md focus:outline-none'
            type='text'
          />
          <SearchIcon className='h-12 p-4' />
        </div>
      </div>

      <div></div>
    </header>
  );
}

export default Header;
