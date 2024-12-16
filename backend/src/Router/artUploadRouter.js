const express = require('express')
const {createArt, fetchArt} = require('../Controller/ArtController')
const {protect} = require('../Middleware/authUser')

const router = express.Router()
router.route('/upload').post(protect, createArt)
router.route('/paintings').get(fetchArt)

module.exports= router