import mongoose from "mongoose";
const connectMongo = (url: any) => {
    mongoose
        .connect(url)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err: Error) => {
            console.log(err);
        });

    mongoose.connection.on("disconnected", () => {
        console.log(`MongoDB disconnected`);
    });

    return mongoose;
};

export default connectMongo;
