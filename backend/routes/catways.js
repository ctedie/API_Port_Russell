const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const catwaysController = require("../controllers/catways.controller");

// Toutes les routes protégées
router.use(auth);

router.get("/", catwaysController.list);
router.get("/:id", catwaysController.getOne);
router.post("/", catwaysController.create);
router.put("/:id", catwaysController.update);
router.delete("/:id", catwaysController.remove);

module.exports = router;
