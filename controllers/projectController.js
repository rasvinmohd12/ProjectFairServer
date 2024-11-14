const projects = require("../models/projectModel");

// add projects
exports.addProjectController = async (req, res) => {
  console.log("inside addProjectController");
  console.log(req.userId);

  const { title, language, overview, github, website } = req.body;
  console.log(title, language, overview, github, website);
  console.log(req.file.filename);

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res
        .status(406)
        .json("Project already in our Database...Please Add Another");
    } else {
      const newProject = new projects({
        title,
        language,
        overview,
        github,
        website,
        projectImg: req.file.filename,
        userId: req.userId
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(err);
  }

  // res.status(200).json("Add Project Request Recieved!!!")
};

// home project
exports.getHomeProjectController = async (req,res)=>{
  console.log("Inside homeProjectController");
  try{
const homeProjects=await projects.find().limit(3)
res.status(200).json(homeProjects)

  }catch(err){
    req.status(401).json(err)
  }
  
}

// all project -authentication required
exports.getAllProjectController = async (req,res)=>{
  console.log("Inside allProjectController");
  const searchKey=req.query.search 
  const query ={
    language:{
      $regex:searchKey,$options:"i"
    }
  }
  try{
const allProjects=await projects.find(query)
res.status(200).json(allProjects)

  }catch(err){
    res.status(401).json(err)
  }
  
}

// user project -authentication required
exports.getUserProjectController = async (req,res)=>{
  console.log("Inside getUserProjectController");
  const userId=req.userId
  try{
const allUserProjects=await projects.find({userId})
res.status(200).json(allUserProjects)

  }catch(err){
    req.status(401).json(err)
  }
  
}

// remove project
exports.removeProjectController = async (req,res)=>{
  console.log("Inside removeProjectController");
  const{pId}=req.params
  try{

    const removeProject =await projects.findByIdAndDelete({_id:pId})
    res.status(200).json(removeProject)
  }catch(err){
    res.status(401).json(err)
  }
  
}

// edit project -authentication requiered
exports.editProjectController = async(req,res)=>{
  console.log("Inside editProjectController ");
const {pid}=req.params
const {title,language,overview,github,website,projectImg}=req.body
const uploadImg =req.file?req.file.filename:projectImg
const userId = req.userId
try{
  const updateProject =await projects.findByIdAndUpdate({_id:pid},{
    title,language,overview,github,website,projectImg:uploadImg,userId
  },{new:true})
  await updateProject.save()
  res.status(200).json(updateProject)
}catch(err){
  res.status(401).json(err)
}
}