const Project = require("../models/project");

module.exports = async function homePage(req, res) {
  try {
    const projectData = await Project.find();
    return res.render("home", {
      taitle: "Home",
      projects: projectData,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
