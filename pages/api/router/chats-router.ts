import { z } from 'zod';
import connectMongo from 'db/connectMongoDB';
import ChatsModel from 'db/models/chatsModel';
import type { Chat } from 'db/models/chatsModel';
// import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { t } from '../../../trpc';
// import Chat from '../../../db/models/chatsModel';

export const chatsRouter = t.router({
  chats: t.procedure.query((): string => {
    try {
      // await connectMongo(); // connect to the database
      // const chats = await ChatsModel.find();
      // return chats;
      return 'hi from chat router';
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'boom from chat',
      });
    }
  }),

  add: t.procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input }): Promise<Chat | undefined> => {
      const { title } = input;
      let result;
      try {
        await connectMongo(); // connect to the database
        result = await ChatsModel.create({ title });
        return result;
      } catch (error) {
        console.log(error);
      }
    }),
});

export type ServerRouter = typeof chatsRouter;
