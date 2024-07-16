//Var ikke denne slettet? Skal den ikke fjernes?
const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const { logIn} = require("../controllers/User_Control");
const { addData,getData,downlod } = require("../controllers/data_control");


router.post("/login", logIn);
router.post("/add", upload.single("file"), addData);
router.get("/getData", getData);
router.get('/download/:id', downlod);



module.exports = router;
