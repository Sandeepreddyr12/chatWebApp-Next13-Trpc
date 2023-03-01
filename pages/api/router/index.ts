// import createRouter from './createRouter';
import { chatsRouter } from './chats-router';
import { t } from '../../../trpc';

export const appRouter = t.router({ chatsRoute: chatsRouter });

// export type definition of API
export type AppRouter = typeof appRouter;
