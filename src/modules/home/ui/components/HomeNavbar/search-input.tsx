import { SearchIcon } from 'lucide-react';
import React from 'react';

export default function SearchInput() {
  // TODO: add search functionality
  return (
    <form className='flex w-full max-w-[600px]'>
      <div className='relative w-full'>
        <input
          type='text'
          placeholder='Search'
          className='focus:border-primary w-full rounded-l-full border py-2 pr-12 pl-4 focus:outline-none'
        />
        {/* TODO: add remove search button */}
      </div>
      <button
        type='submit'
        className='bg-primary rounded-r-full border border-l-0 px-5 py-2.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <SearchIcon className='text-primary-foreground size-5' />
      </button>
    </form>
  );
}
