import Mongoose from "mongoose";

const { Schema } = Mongoose;

const departmentSchema = new Schema({
  title: String,
  email: String,
  contact: Number,
  institutionid: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
  },
});

export const Department = Mongoose.model("Department", departmentSchema);
