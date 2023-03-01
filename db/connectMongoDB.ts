import mongoose from 'mongoose';

const connectMongo = async () =>
  mongoose
    .connect(process.env.MONGODB_KEY!)
    .then(() => {
      console.log('mongodb connected');
    })
    .catch(() => {
      console.log('error while connecting database');
    });

export default connectMongo;
