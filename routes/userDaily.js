const express = require('express')
const {
   createUserDaily,
   getAllUserDailies,
   getUserDailies,
   updateUserDailies
} = require('../controllers/userDaily')
const router = express.Router()

router
    .route('/')
    .get(getAllUserDailies)
    .post(createUserDaily)


router
    .route('/:id')
    .get(getUserDailies)
    .put(updateUserDailies)

module.exports = router