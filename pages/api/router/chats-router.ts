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
      console.log(cursor, sortBy);
      const Sorting =
        sortBy === 'oldestFirst' ? { createdAt: 1 } : { createdAt: -1 };
      try {
        // await connectMongo(); // connect to the database
        // const TotalDoc = await ChatsModel.countDocuments();

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
          message: 'boom from query',
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
