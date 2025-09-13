import { caller } from '@/trpc/server';

export default async function Home() {
  const data = await caller.hello({ text: 'from tRPC server' });

  return <div>{data.greeting}</div>;
}
