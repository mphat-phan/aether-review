import mongoose from "mongoose";
const connectMongo = (url) => {
    mongoose
        .connect(url)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(err);
        });

    mongoose.connection.on("disconnected", () => {
        console.log(`MongoDB disconnected`);
    });

    return mongoose;
};

export default connectMongo;
