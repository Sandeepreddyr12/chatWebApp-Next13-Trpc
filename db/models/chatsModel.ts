import mongoose, { Document, Schema } from 'mongoose';

export interface Chat extends Document {
  message: string;
  sender: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema(
  {
    message: { type: String, required: true },
    image: {
      type: String,
      default: null,
    },
    sender: {
      type: String,
    },
  },
  { timestamps: true }
);

const ChatsModel = mongoose.model<Chat>('Chats', chatSchema);

export default ChatsModel;
