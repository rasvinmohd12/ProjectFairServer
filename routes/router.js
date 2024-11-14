const express = require('express')
const userController =require('../controllers/userController')
const projectController =require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router= new express.Router()


// register :post request to  http://localhost:3000/register
router.post("/register",userController.registerController)
// login :post request to  http://localhost:3000/login
router.post("/login",userController.loginController)


// add project:post request http://localhost:3000/add-project
router.post('/add-project',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.addProjectController)
// homeProject -get request to http://localhost:3000/home-projects
router.get("/home-projects",projectController.getHomeProjectController)
// allProjects : get request to http://localhost:3000/all-projects
router.get("/all-projects",jwtMiddleware,projectController.getAllProjectController)

// userProjects : get request to http://localhost:3000/user-projects
router.get("/user-projects",jwtMiddleware,projectController.getUserProjectController)

// remove Projects : get request to http://localhost:3000/pid/remove-projects
router.delete('/:pId/remove-project',jwtMiddleware,projectController.removeProjectController)

// updateProjects : put request to http://localhost:3000/pid/edit-projects
router.put('/:pid/edit-projects',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.editProjectController)

// edit user : put request to http://localhost:3000/user/edit
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editProfileController)


// export router
module.exports= router