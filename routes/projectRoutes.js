const express = require("express");
const router = express.Router();

const{createProject, viewProject, createIssue, deleteProject} = require("../controller/projectController")

router.route("/Create").post(createProject);
router.route("/:id").get(viewProject);
router.route("/:id/CreateIssue").post(createIssue);
router.route("/:id/Delete").get(deleteProject);

module.exports = router;