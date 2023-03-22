import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('already connected');
  } else {
    mongoose
      .connect(process.env.MONGODB_KEY!)
      .then(() => {
        console.log('mongodb connected');
      })
      .catch(() => {
        console.log('error while connecting database');
      });
  }
};

export default connectMongo;
