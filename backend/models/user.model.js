import mongoose from "mongoose";


// Define the User schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required:true  // Example roles, customize as needed
  },
  profile: {
    bio:{type:String},
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    compnay:{type:mongoose.Schema.Types.ObjectId, ref:'Compnay'},
    profilePhoto:{ 
        type:String,
        default:""
    },
  },
}, {
  timestamps: true,
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
