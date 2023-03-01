// import { router } from '@trpc/server';
// import superjson from 'superjson';
import { NextApiRequest, NextApiResponse } from 'next';
// import * as trpcNext from '@trpc/server/adapters/next';

// we can pass anything in the context, it can be available to all the procedures

export const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    req,
    res,
    // MongoDB we can pass db, which can be available t all the procedures
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
