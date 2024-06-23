const Project = require("../models/project");
const Issue = require("../models/issue");

async function createProject(req, res) {
  try {
    const { projectname, author, description } = req.body;
    await Project.create({ projectname, author, description });
    return res.redirect("/");
  } catch (error) {
    console.log(`Error saving Project Data${error}`);
    res.status(500).json({ error: "2 Internal server error" });
  }
}

async function viewProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate("issues");
    return res.render("viewProject", {
      taitle: "View",
      project,
    });
  } catch (error) {
    console.log(`Error view Project Data${error}`);
    res.status(500).json({ error: "1 Internal server error" });
  }
}
// Create issue
async function createIssue(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project) {
      const issue = await Issue.create({
        taitle: req.body.taitle,
        author: req.body.author,
        description: req.body.description,
        labele: req.body.labels,
      });

      project.issues.push(issue);

      if (!(typeof req.body.labels === "string")) {
        for (let label of req.body.labels) {
            let isPresent = project.labels.find((obj) => obj == label);
            if (!isPresent) {
                project.labels.push(label);
            }
        }
      } else {
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);  
        }
      }
      await project.save();
      return res.redirect(`back`);
    }
  } catch (error) {
    console.log(`Error view Project Data${error}`);
    res.status(500).json({ error: "3 Internal server error" });
  }
}

// Controller to delete a project and its associated issues
async function deleteProject (req, res) {
  try {
    const { id } = req.params;

    // Find and delete the project by its ID
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      // If project is not found, handle the error
      return res.status(404).send("Project not found");
    }

    // Delete all issues associated with the project
    await Issue.deleteMany({ _id: { $in: project.issues } });

    // Redirect to the home page
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { createProject, viewProject, createIssue, deleteProject };
