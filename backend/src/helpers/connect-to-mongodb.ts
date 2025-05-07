import mongoose, { ConnectOptions } from "mongoose";

export async function connectToMongodb() {
  console.log(`Connecting to Database.`);
  await mongoose.connect(process.env.MONGO_URI!, {} as ConnectOptions);
  const dbConnection = mongoose.connection;
  dbConnection.on("error", function (err) {
    console.error("Failed to connect to database", { stack: err.stack });
    process.exit(1);
  });

  dbConnection
    .asPromise()
    .then(() => {
      console.log(`Connected To MongoDb.`);
    })
    .catch((err) => {
      console.log("Failed to connect to database", { stack: err.stack });
    });
}
