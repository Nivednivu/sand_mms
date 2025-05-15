const express = require("express")
const { register, login, resendOtp, sendOtp, verifyOtp, resetPassword} = require("./userAuthControl.js")
const { createVehicle, updateVehicle, getAllVehicles, deleteVehicle } = require("./vehicleController.js")
const upload = require("./uploadMiddleware.js")
const { queryData, getAllQueries, getQueryById, getuserById } = require("./queryAuth.js")
const { employeeData } = require("./employeeAuth.js")
const {  adminAddQuaeyAPI, getAllAdminEntries, admingetQueryById, adminUpdateQueryById } = require("./adminAuth.js")
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOtp);
router.post('/resendOtp',resendOtp)
router.post('/resetpassword',resetPassword)
// router.get('/add',createVehicle)
 

router.post(
    '/vehicles',
    upload.fields([
      { name: 'vehicleImage', maxCount: 1 },
      { name: 'numberPlateImage', maxCount: 1 }
    ]),
    createVehicle 
  );
  router.post(
    '/updatevehicles/:id', // include :id in the route
    upload.fields([
      { name: 'vehicleImage', maxCount: 1 },
      { name: 'numberPlateImage', maxCount: 1 } 
    ]),
    updateVehicle
  );

  

router.get('/vehicles',getAllVehicles);
router.delete('/vehicles/:id',deleteVehicle);
router.post('/query',queryData);
router.get('/queryget',getAllQueries);
router.get('/queryget',getQueryById);
router.get('/queryget/:id', getQueryById);
router.post('/queryget/:id', getuserById);
router.post('/employeeadd', employeeData);
router.post('/adminadd', adminAddQuaeyAPI);
router.get('/adminadd', getAllAdminEntries);
router.get('/adminadd/:id', admingetQueryById);
router.put('/adminupdate/:id', adminUpdateQueryById);


// router.post('/employeeget/:id', employeeDataById);

  // routes/vehicleRoutes.js

module.exports = router 




  