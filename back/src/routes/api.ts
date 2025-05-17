import { Router } from 'express';
import authController from '../controllers/authController';
import postController from '../controllers/postController';
import userController from '../controllers/userController';
import auth from '../middleware/auth';

const router = Router();

router.post('/login', authController.login);

router.get('/posts', auth, postController.getAllPosts);
router.post('/posts', auth, postController.createPost);
router.post('/posts/:id/like', auth, postController.likePost);

router.get('/profile', auth, userController.getProfile);

export default router;
