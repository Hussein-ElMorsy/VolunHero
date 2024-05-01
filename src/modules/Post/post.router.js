import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";
import * as postController from "./controller/post.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as validators from "./post.validation.js"
import { endPoint } from "./post.endpoint.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
const router = Router({mergeParams:true});


router.get("/",asyncHandler(postController.getPostsOfSpecificUser));
router.get("/ownerPosts", auth(endPoint.getPostsOfOwner),asyncHandler(postController.getPostsOfOwner));
router.post("/", auth(endPoint.createPost),fileUpload(fileValidation.image).fields([
    {name:"attachments",maxCount:100},
]),validation(validators.createPost),asyncHandler(postController.createPost));

router.put("/:id",auth(endPoint.updatePost),fileUpload(fileValidation.image).fields([
    {name:"attachments",maxCount:100},
]),validation(validators.updatePost),asyncHandler(postController.updatePost));


router.put("/:id/like",auth(endPoint.likePost),validation(validators.likePost),asyncHandler(postController.likePost));


router.get("/:id", auth(endPoint.createPost),asyncHandler(postController.getPost));
router.get("/:id", auth(endPoint.createPost),asyncHandler(postController.deletePost));



// router.get("/",asyncHandler(chatControllers.getAllChats))
// router.post('/',auth(endPoint.createChat),validation(validators.createChat), asyncHandler(chatControllers.createChat))
// router.get('/:userId',auth(endPoint.findUserChats),validation(validators.findUserChats),asyncHandler(chatControllers.findUserChats))
// router.get('/find/:firstId/:secondId',auth(endPoint.findChat),validation(validators.findChat),asyncHandler(chatControllers.findChat))
// router.get('/find/:chatId',auth(endPoint.findChat),validation(validators.findChatById),asyncHandler(chatControllers.findChatById))
// router.delete('/:chatId',auth(endPoint.deleteChat),validation(validators.deleteChat),asyncHandler(chatControllers.deleteChat))

export default router