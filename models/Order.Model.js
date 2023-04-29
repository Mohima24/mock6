const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: ObjectId,
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    restaurant : { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: {
    type:String,
    enum:['placed','preparing','on the way','delivered'],
    default:'placed'
    }
})

const OrderModel = mongoose.connect('user',orderSchema);

module.exports = OrderModel;