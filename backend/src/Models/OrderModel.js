const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        artId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Art', // Reference to Art model
            required: true,
        },
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist', // Reference to Artist model
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer', // Reference to Customer model
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerPhone: {
            type: String,
            required: true,
        },
        customerAddress:{
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
