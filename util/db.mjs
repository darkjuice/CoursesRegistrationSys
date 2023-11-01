import { mongoose  } from "mongoose";

const url = "mongodb://127.0.0.1:27017/coursetooldb"

mongoose.connect(url);

const mongodb = mongoose;

export {mongodb};
