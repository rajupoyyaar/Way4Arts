const express = require('express')
const { registerCustomer, loginCustomer } = require('../Controller/CustomerController')
const { protectCustomer } = require('../Middleware/authUser')
const { placeOrder, fetchCustomerOrders } = require('../Controller/OrderController')

const router = express.Router()

router.post('/register', registerCustomer)
router.post('/login', loginCustomer)

router.post('/order', protectCustomer, placeOrder)
router.get('/orders', protectCustomer, fetchCustomerOrders)

module.exports = router