const router = require("express").Router();
const api_controller = require("../controller/crud_api_controller");

router.post("/add", api_controller.add);
router.get("/list", api_controller.list);
router.get("/:id", api_controller.singleData);
router.put("/:id", api_controller.updateData);
router.delete("/:id",api_controller.deleteData)

module.exports = router;
