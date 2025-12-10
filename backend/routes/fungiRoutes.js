const express = require("express");
const router = express.Router();

const { upload } = require("../utils/upload");
const controller = require("../controllers/fungiController");

router.get("/", controller.listFungi);
router.get("/:id", controller.getFungus);
router.post("/", upload.array("images", 5), controller.createFungus);
router.delete("/:id", controller.deleteFungus);

module.exports = router;
