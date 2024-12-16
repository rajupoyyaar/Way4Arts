const asyncHandler = require('express-async-handler');
const Customer = require('../Models/CustomerModel');
const generateToken = require('../Utils/GenerateToken');

const registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Check if customer exists
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
        res.status(400);
        throw new Error('Customer already exists');
    }

    // Create customer
    const customer = await Customer.create({
        name,
        email,
        password,
        phone,
    });

    if (customer) {
        res.status(201).json({
            _id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            token: generateToken(customer._id),
        });
    } else {
        res.status(400);
        throw new Error('Failed to create customer');
    }
});

const loginCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });

    if (customer && (await customer.matchPassword(password))) {
        res.status(200).json({
            _id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            token: generateToken(customer._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


module.exports = {registerCustomer, loginCustomer}