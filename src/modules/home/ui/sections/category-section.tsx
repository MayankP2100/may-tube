'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FilterCarousel } from '@/components/filter-carousel';
import { useRouter } from 'next/navigation';

interface CategoriesSectionProps {
  categoryId?: string;
}

const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <ErrorBoundary fallback={<p>Failed to load categories.</p>}>
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </Suspense>
    </ErrorBoundary>
  );
};

const CategoriesSkeleton = () => {
  return (
    <FilterCarousel
      isLoading
      onSelect={() => {}}
      data={[]}
    />
  );
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions(),
  );

  const data = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set('categoryId', value);
    } else {
      url.searchParams.delete('categoryId');
    }

    router.push(url.toString());
  };

  return (
    <FilterCarousel
      onSelect={onSelect}
      value={categoryId}
      data={data}
    />
  );
};

export default CategoriesSection;
