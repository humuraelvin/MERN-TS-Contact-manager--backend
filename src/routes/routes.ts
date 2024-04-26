// import express from "express";
// const authController = require("../controllers/auth.controller");
// const contactController = require("../controllers/contacts.contoller");

// const router = express.Router();

// router.post("/addContact", contactController.addContact);
// router.get("/getContact", contactController.getSingleContact);
// router.get("/getContacts", contactController.getAllContacts);
// router.put("/editContact", contactController.editContact);
// router.delete("/deleteContact", contactController.deleteContact);
// router.post("/register", authController.registerUser);
// router.post("/login", authController.loginUser);

// export default router;

import express from "express";
import authController from "../controllers/auth.controller"; // Updated import
import contactsContoller from "../controllers/contacts.contoller";

const router = express.Router();

router.post("/addContact", contactsContoller.createContact);
router.get("/getContact/:id", contactsContoller.getSingleContact);
router.get("/getContacts/", contactsContoller.getAllContacts);
router.put("/editContact/:id", contactsContoller.editContact);
router.delete("/deleteContact/:id", contactsContoller.deleteContact);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

export default router;
