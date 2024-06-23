// import Express
const express = require("express");

const router = express.Router();

const homePage = require("../controller/home")

console.log('router loaded');
router.route("/").get(homePage)

router.use('/Project', require('./projectRoutes'));

module.exports = router;