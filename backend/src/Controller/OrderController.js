const asyncHandler = require('express-async-handler');
const Art = require('../Models/ArtModel');
const Order = require('../Models/OrderModel');

// Place a new order
const placeOrder = asyncHandler(async (req, res) => {
    const { artId, customerName, customerPhone, customerAddress } = req.body;

    if (!artId || !customerName || !customerPhone || !customerAddress)  {
        res.status(400);
        throw new Error('All fields are required');
    }

    const art = await Art.findById(artId);
    if (!art) {
        res.status(404);
        throw new Error('Art not found');
    }

    const order = await Order.create({
        artId,
        artistId: art.userId,
        customerId: req.userId._id, // Provided by protect middleware
        customerName,
        customerPhone,
        customerAddress,
        status: 'Pending',
    });

    res.status(201).json(order);
});

// Fetch all orders for logged-in customer
const fetchCustomerOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ customerId: req.userId._id }).populate('artId', 'category price art');
    if (orders.length > 0) {
        res.status(200).json(orders);
    } else {
        res.status(404);
        throw new Error('No orders found');
    }
});


const fetchOrdersForArtist = asyncHandler(async (req, res) => {
    // Fetch orders where the logged-in artist is the creator of the art
    const artistOrders = await Order.find({ artistId: req.userId._id })
                                    .populate('artId', 'category price art')  // Populate art details
                                    .populate('customerId', 'customerName customerPhone customerAddress'); // Populate customer details

    if (artistOrders.length === 0) {
        res.status(404);
        throw new Error('No orders found for this artist');
    }

    res.status(200).json(artistOrders);
});

// Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;

    // Ensure valid status
    const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error('Invalid order status');
    }

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Check if the logged-in artist is the creator of the art
    if (order.artistId.toString() !== req.userId._id.toString()) {
        res.status(403);
        throw new Error('You are not authorized to update this order');
    }

    // Update status
    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
});




module.exports = {placeOrder, fetchCustomerOrders, fetchOrdersForArtist, updateOrderStatus}
