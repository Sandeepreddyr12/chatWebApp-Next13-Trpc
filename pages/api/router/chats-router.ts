import { z } from 'zod';
// import connectMongo from 'db/connectMongoDB';
import ChatsModel from 'db/models/chatsModel';
// import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { t } from '../../../trpc';
// import Chat from '../../../db/models/chatsModel';

export const chatsRouter = t.router({
  chats: t.procedure
    .input(
      z.object({
        createdAt: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        // await connectMongo(); // connect to the database
        const chats = await ChatsModel.find().sort(input);
        return chats;
        // return 'hi from chat router';
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'boom from chat',
        });
      }
    }),

  addMsg: t.procedure
    .input(
      z.object({
        message: z.string(),
        sender: z.string(),
        image: z.string().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const { message, sender, image } = input;
      let result;
      try {
        result = await ChatsModel.create({ message, sender, image });
        return result;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'boom from chat',
        });
      }
    }),

  deleteMsg: t.procedure
    .input(
      z.object({
        Id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { Id } = input;
      try {
        await ChatsModel.findByIdAndDelete(Id);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'boom from chat',
        });
      }
    }),
});

export type ServerRouter = typeof chatsRouter;
