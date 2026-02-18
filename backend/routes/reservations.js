const express = require("express");
const router = express.Router({ mergeParams: true });

const auth = require("../middleware/auth");
const reservationsController = require("../controllers/reservations.controller");

router.use(auth);

router.get("/", reservationsController.list);
router.get("/:idReservation", reservationsController.getOne);
router.post("/", reservationsController.create);
router.put("/:idReservation", reservationsController.update);
router.delete("/:idReservation", reservationsController.remove);

module.exports = router;
