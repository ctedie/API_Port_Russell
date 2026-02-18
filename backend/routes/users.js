const express = require("express");
const router = express.Router();


const auth = require("../middleware/auth");
router.use(auth);

const usersController = require("../controllers/users.controller");

// GET /users
router.get("/", usersController.list);

// GET /users/:email
router.get("/:email", usersController.getByEmail);

// POST /users
router.post("/", usersController.create);

// PUT /users/:email
router.put("/:email", usersController.update);

// DELETE /users/:email
router.delete("/:email", usersController.remove);

module.exports = router;
