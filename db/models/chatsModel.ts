import mongoose, { Document, Schema } from 'mongoose';

export interface Chat extends Document {
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema(
  {
    title: String,
  },
  { timestamps: true }
);

// let mod: typeof mongoose.Model;
// try {
//   mod = mongoose.model('chats', chatsSchema);
// } catch (e) {
//   mod = mongoose.model('chats');
// }

const ChatsModel = mongoose.model<Chat>('Chats', chatSchema);

export default ChatsModel;
