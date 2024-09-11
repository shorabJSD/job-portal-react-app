import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Company schema
const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  website: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
  },
  logo: {
    type: String, // URL or path to the logo image
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assumed that the user model is named 'User')
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create and export the Company model
const Company = mongoose.model('Company', companySchema);
export default Company;
