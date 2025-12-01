import mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({
  code: { type: String, required: true },
  genericName: { type: String, required: true },
  brandName: { type: String, required: true },
  company: { type: String, required: true },
  launchDate: { type: Date, required: true }
});

// "Drug" collection name will be "drugs"
const Drug = mongoose.model('Drug', drugSchema);

export default Drug;
