const mongoose = require('mongoose');
const MenuSchema = require('./menu.model')

const restaurentSchema = mongoose.Schema({
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [
        MenuSchema
    ]
})

const RestaurentModel = mongoose.model('Restaurant',restaurentSchema);

module.exports = RestaurentModel;