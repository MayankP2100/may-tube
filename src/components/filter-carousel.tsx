'use client';

import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from './ui/carousel';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}

export const FilterCarousel = ({
  value,
  isLoading,
  onSelect,
  data,
}: FilterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='relative w-full'>
      {/* Left fade */}
      <div
        className={cn(
          'from-background pointer-events-none absolute top-0 left-12 z-10 h-full w-12 bg-gradient-to-r to-transparent',
          current === 1 && 'hidden',
        )}
      />

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className='w-full px-12'
      >
        <CarouselContent className='-ml-3'>
          {!isLoading && (
            <CarouselItem
              className='basis-auto pl-3'
              onClick={() => onSelect(null)}
            >
              <Badge
                variant={!value ? 'default' : 'outline'}
                className='cursor-pointer p-2'
              >
                All
              </Badge>
            </CarouselItem>
          )}
          {isLoading &&
            Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-auto pl-3'
              >
                <Skeleton className='h-full w-[100px] rounded-lg px-3 py-1 text-sm font-semibold' />
                &nbsp;
              </CarouselItem>
            ))}
          {!isLoading &&
            data.map((item) => (
              <CarouselItem
                key={item.value}
                className='basis-auto pl-3'
                onClick={() => onSelect(item.value)}
              >
                <Badge
                  variant={value === item.value ? 'default' : 'outline'}
                  onClick={() =>
                    onSelect?.(item.value === value ? null : item.value)
                  }
                  className='cursor-pointer p-2'
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className='left-0 z-20' />
        <CarouselNext className='right-0 z-20' />
      </Carousel>

      {/* Right fade */}
      <div
        className={cn(
          'from-background pointer-events-none absolute top-0 right-12 z-10 h-full w-12 bg-gradient-to-l to-transparent',
          current === count && 'hidden',
        )}
      />
    </div>
  );
};
