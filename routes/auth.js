const express = require('express');
const {register,getUsers,getMe} = require("../controllers/auth")


const router = express.Router() 


router.post('/register',register)
router.get('/me',getMe).get('/',getUsers)


module.exports = router