const express = require("express")
const { register, login, resendOtp, sendOtp} = require("./userAuthControl.js")
const { createVehicle, allVehicles } = require("./vehicleController.js")
const upload = require("./uploadMiddleware.js")
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/sendotp',sendOtp)
router.post('/resendOtp',resendOtp)
// router.get('/add',createVehicle)
 
router.post(
    '/vehicles',
    upload.fields([
      { name: 'vehicleImage', maxCount: 1 },
      { name: 'numberPlateImage', maxCount: 1 }
    ]),
    createVehicle
  );
router.get('/vehicles',allVehicles);

  // routes/vehicleRoutes.js

module.exports = router




  