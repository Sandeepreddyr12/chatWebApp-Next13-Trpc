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
        sortBy: z.string(),
        cursor: z.number().optional().default(0),
      })
    )
    .query(async ({ input }) => {
      const { cursor, sortBy } = input;
      const Sorting =
        sortBy === 'oldestFirst' ? { createdAt: 1 } : { createdAt: -1 };
      try {
        // await connectMongo(); // connect to the database

        // Fetch the data from the database using the mongoose model
        const data = await ChatsModel.find()
          .sort(Sorting)
          .skip(cursor)
          .limit(10)
          .exec();

        const messages = data.reverse();

        // Count the total number of documents in the collection
        const totalCount = await ChatsModel.countDocuments().exec();

        // Calculate the offset of the next page
        const nextPage = cursor + 10 < totalCount ? cursor + 10 : null;

        // Return the messages and the offset of the next page
        return {
          messages,
          nextPage,
        };
        // return 'hi from chat router';
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error occured unable to fetch messages',
        });
      }
    }),

  addMsg: t.procedure
    .input(
      z.object({
        message: z.string().min(1).max(280),
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
          message: 'unable to send message',
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
          message: 'deleting message failed, try again',
        });
      }
    }),
});

export type ServerRouter = typeof chatsRouter;
