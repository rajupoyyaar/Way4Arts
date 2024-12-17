const express = require('express')
const { registerCustomer, loginCustomer } = require('../Controller/CustomerController')
const { protectCustomer } = require('../Middleware/authUser')
const { placeOrder, fetchCustomerOrders } = require('../Controller/OrderController')

const router = express.Router()

router.route('/register').post(registerCustomer)
router.route('/login').post(loginCustomer)

router.route('/order').post(protectCustomer, placeOrder)
router.get('/orders', protectCustomer, fetchCustomerOrders)

module.exports = router