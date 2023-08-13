import mongoose from 'mongoose';

export async function connection() {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully :)');
    });

    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running' + err
      );
      // process.exit()
    });
  } catch (err) {
    console.log('Something went wrong :(');
    console.log(err);
  }
}
