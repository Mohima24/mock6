const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref:"users" },
    flight : { type: mongoose.Schema.Types.ObjectId, ref: 'flights'}
})
const BookingModel = mongoose.model("booking",bookingSchema)

module.exports={
    BookingModel
}