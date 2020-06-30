import { Router } from 'express';

import passport from 'passport';

import auth from '../lib/auth';

const router = Router();

router.get('/failure', (req, res) => {
    res.json({
        message: 'API crud failure'
    })
})

//Register
router.post('/register', auth.isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/posts',
    failureRedirect: '/failure',
    failureFlash: true
})
);


//Login
router.post(('/login'), auth.isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        session: true,
        successRedirect: '/posts',
        failureRedirect: '/failure',
        failureFlash: true
    })(req, res, next);
    console.log(req.user)
});

router.get('/logout', auth.isLoggedIn, (req, res) => {
    req.logOut();
    res.json({
        message: 'Closed Session'
    });
});

export default router;