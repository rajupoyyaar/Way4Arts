const express = require('express')
const router = express.Router()
const {artistRegister, artistLogin} = require('../Controller/ArtistController')
const { protect } = require('../Middleware/authUser')
const { updateOrderStatus, fetchOrdersForArtist } = require('../Controller/OrderController')

router.route('/register').post(artistRegister)
router.route('/login').post(artistLogin)

router.route('/orders').get(protect, fetchOrdersForArtist)
router.route('/order/status').put(protect, updateOrderStatus)

module.exports = router 