const express = require('express')
const {
    getDailies,
    getDaily,
    createDaily,
    updateDaily,
    deleteDaily
} = require('../controllers/daily')
const router = express.Router()

router
    .route('/')
    .get(getDailies)
    .post(createDaily)

router
    .route("/:id")
    .get(getDaily)
    .put(updateDaily)
    .delete(deleteDaily)

module.exports = router