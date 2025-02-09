const express=require('express')

const router=express.Router()

const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./KickIT/uploads/')
    },
    filename:function(req,file,cb){
       
        return cb(null,`../uploads/${req.id}.png`)
    }
})

const upload=multer({storage:storage})

const eventController=require('../Controller/eventController')

const userController=require('../Controller/userController')

const authController=require('../Controller/authController')


//router.route('/createEvent/:id').get(eventController.getCreateEvent).post(eventController.createEvent)

router.route('/createEvent').post(eventController.createEvent)

router.route('/home').get(eventController.getAllEvents)

router.route('/createTournament').post(eventController.postTournament)

router.route('/home/:id').get(eventController.getAllEvents)

router.route('/profile').get(authController.protect,userController.getProfile)

router.route('/profileUpdate').post(userController.makeChanges,upload.single("file"),userController.updateProfilePicture).patch(userController.updateProfile)

router.route('/chatApp').get(eventController.chatApp)

router.route('/signUp').post(authController.signUp)

router.route('/login').post(authController.login)

router.route('/updateMatches').patch(eventController.updateTotalPlayers)

//router.route('/sendEventDetails').post()

router.route('/logout').get(authController.logOut)

router.route('/getTournaments').get(eventController.getAllTournaments)

module.exports=router