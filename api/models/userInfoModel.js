import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    linkedinLink: {
      type: String,
      required: true,
    },
    twitterLink: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: Number,
      required: true,
    },
    whatsAppNum: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    verification: {
      type: Boolean,
      required: true,
      default: false,
    },
    uploadUrls: {
      type: Array,
      required: true,
    },
    logo: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  },
  { timestamps: true }
);

const userInfo = mongoose.model('UserInfo', userInfoSchema);

export default userInfo;
