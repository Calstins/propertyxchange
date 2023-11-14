import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    lga: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    appendTo: {
      type: String,
      required: false,
    },
    installmentAppendTo: {
      type: String,
      required: false,
    },
    initialPayment: {
      type: Number,
      required: true,
    },
    monthlyPayment: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    toilets: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    serviced: {
      type: Boolean,
      required: true,
    },
    newlyBuilt: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    youtubeLink: {
      type: String,
      required: false,
    },
    instagramLink: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    subType: {
      type: String,
      required: false,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    installment: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
