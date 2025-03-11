import Mongoose from "mongoose";

const { Schema } = Mongoose;

const institutionSchema = new Schema({
  title: String,
  eircode: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Institution = Mongoose.model("Institution", institutionSchema);
