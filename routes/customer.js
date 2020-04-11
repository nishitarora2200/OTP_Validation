const express = require('express');
const router = express.Router();
const {postOtp,postVerify,getOtp,getVerify} = require('../controllers/customer');
const {check,validationResult} = require('express-validator');
router.get('/send',getOtp);
router.post('/send',[check('email').isEmail()],postOtp);


router.get('/verify',getVerify);
router.post('/verify',[check('otp').isNumeric().isLength(6)],postVerify);

module.exports = router;