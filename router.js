const express = require("express")
const { register, login, resendOtp, sendOtp} = require("./userAuthControl.js")
const router = express.Router()

router.get('/register',register)
router.get('/login',login)
router.get('/sendotp',sendOtp)
router.get('/resendOtp',resendOtp)


module.exports = router




  