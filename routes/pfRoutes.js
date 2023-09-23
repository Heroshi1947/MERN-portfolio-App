// const express = require("express");
// const { sendEmailController } = require("../controllers/pfController");

// //router object
// const router = express.Router();

// //routes
// router.post("/sendEmail", sendEmailController);

// // /export
// module.exports = router;

const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/pfController");

router.post("/sendEmail", sendEmail);

module.exports = router;
