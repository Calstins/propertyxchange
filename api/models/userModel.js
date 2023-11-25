import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email2: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: false,
    },
    accountType: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    businessCategory: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    services: {
      type: String,
      required: false,
    },
    linkedinLink: {
      type: String,
      required: false,
    },
    instagramLink: {
      type: String,
      required: false,
    },
    twitterLink: {
      type: String,
      required: false,
    },
    facebookLink: {
      type: String,
      required: false,
    },
    phoneNum1: {
      type: Number,
      required: false,
    },
    phoneNum2: {
      type: Number,
      required: false,
    },
    whatsAppNum: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    lga: {
      type: String,
      required: false,
    },
    verification: {
      type: Boolean,
      required: true,
      default: false,
    },
    uploadDoc: {
      type: Array,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
