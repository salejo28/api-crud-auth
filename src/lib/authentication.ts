import passport from 'passport';
import * as passportLocal from 'passport-local';
import { Request } from 'express'

const LocalStrategy = passportLocal.Strategy;

//import pool from '../database';
import helpers from '../lib/helpers';
import { User } from '../interface/user';
import pool from '../database';


passport.use('local.signup', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req: Request, username, password, done): Promise<any> => {

    const user: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length > 0) {
        done(null, false, req.flash( 'message', 'The username is alredy exist' ))
    } else {
        const { fullname } = req.body;

        const newUser: User = {
            username,
            password,
            fullname
        }

        newUser.password = await helpers.encryptPassword(password);
        const result: any = await pool.query('INSERT INTO users SET ?', newUser);
        newUser.id = result.insertId;
        done(null, newUser);
    }

}));


passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows: any = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    done(null, rows[0]);
});

//login
passport.use('local.login', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows: any = await pool.query('SELECT * FROM users WHERE username = ?', [username])

    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, ({ message: 'Welcome'}));
        } else {
            done(null, false, ({message: 'Password incorect'}))
        }
    } else {
        return done(null, false, ({ message: 'The username does no exist' }))
    }

}))