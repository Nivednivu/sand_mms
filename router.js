const express = require("express")
const { register, login, resendOtp, sendOtp, verifyOtp, resetPassword} = require("./userAuthControl.js")
const { createVehicle, updateVehicle, getAllVehicles, deleteVehicle } = require("./vehicleController.js")
const upload = require("./uploadMiddleware.js")
const { queryData, getAllQueries, getQueryById, getuserById, getCurrentSerial, generateNextSerial, deleteQuery, deleteAllQueries, getQueriesByLessee } = require("./queryAuth.js")
const { employeeData, getLastEmployee } = require("./employeeAuth.js")
const {  adminAddQuaeyAPI, getAllAdminEntries, admingetQueryById, adminUpdateQueryById, adminDeleteQueryById, getAllAdminEntriesLast, checkLesseeIdExists, updateAdminData, updateAdminWithCredentials, loginAdmin } = require("./adminAuth.js")
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


router.get('/queryget',getAllQueries);
router.post('/query', queryData);
router.get('/getQueriesByLessee/:lesseeId', getQueriesByLessee);




router.get('/serial', getCurrentSerial);
router.post('/queryserialno', generateNextSerial);
router.delete('/deleteQuery/:id', deleteQuery);
router.delete('/deleteAllQueries', deleteAllQueries);
router.get('/queryget/:id', getQueryById);

// In your routes file (e.g., routes.js)
 
 
// router.get('/dispatch',getCurrentDispatch);
// router.post('/dispatchno',generateNextDispatch);

 
 
 
router.get('/queryget',getQueryById); 
router.post('/queryget/:id', getuserById); 
router.post('/adminadd', upload.single('signature'), adminAddQuaeyAPI);  


router.put('/update-admin', updateAdminData);
router.get('/adminadd', getAllAdminEntries);
router.get('/admingetlast', getAllAdminEntriesLast);
router.get('/check-lessee/:lesseeId',checkLesseeIdExists)
router.put('/admin/update-credentials',updateAdminWithCredentials) 
router.post('/loginAdmin', loginAdmin);



router.get('/adminadd/:id', admingetQueryById); 
 
// Make sure this route is properly set up in your backend
router.put('/adminupdate/:id', adminUpdateQueryById);

router.delete('/admin/delete/:id',adminDeleteQueryById);
// router.put('/employee/:id', employeeDataById);



router.post('/employeeadd', employeeData);

router.get('/employee/last', getLastEmployee);

// router.post('/employeeget/:id', employeeDataById);

  // routes/vehicleRoutes.js

module.exports = router 




  