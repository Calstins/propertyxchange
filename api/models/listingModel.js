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
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
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
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      enum: ['rent', 'sale', 'shortlet', 'jventure'],
      required: true,
    },
    type: {
      type: String,
      enum: ['flat', 'house', 'land', 'commercial', 'venue'],
      required: true,
    },
    subtype: {
      type: String,
      required: function () {
        return ['flat', 'house', 'land', 'commercial', 'venue'].includes(
          this.type
        );
      },
      enum: function () {
        switch (this.type) {
          case 'flat':
            return ['mini', 'self-contain'];
          case 'house':
            return [
              'd-bungalow',
              'd-duplex',
              's-bungalow',
              's-duplex',
              't-bungalow',
              't-duplex',
            ];
          case 'land':
            return ['residential', 'commercial', 'mixed-used', 'industrial'];
          case 'house':
            return [
              'church',
              'factory',
              'filling-station',
              'hotel',
              'office',
              'plaza',
              'restaurant',
              'shop',
              'school',
              'tank-farm',
              'warehouse',
            ];
          case 'commercial':
            return ['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms'];
          case 'venue':
            return ['conference', 'hall'];
          default:
            return [];
        }
      },
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
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
