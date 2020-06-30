import { Router } from 'express';

import ctr from '../controllers/posts.controller';

import auth from '../lib/auth';

const router = Router();

router.get('/posts/', auth.isLoggedIn, ctr.getPosts);

router.post('/posts/', auth.isLoggedIn,ctr.createPost);

router.route('/posts/:id')
    .put(auth.isLoggedIn, ctr.updatePost)
    .delete(auth.isLoggedIn, ctr.deletePost);

export default router;