import express, { Application } from "express";
import morgan from "morgan";
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import flash from 'connect-flash'

//express-mysql-session
const MySQLStore = require('express-mysql-session')(session)
//import MySQLStore from 'express-mysql-session'
import keys from "./keys";
import './lib/authentication';
import auth from './routes/user.routes';
import posts from './routes/posts.routes';


export class App {

    app: Application

    constructor(private port?: string | number) {

        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.globalVariables();

    }

    settings() {
        this.app.set('port', process.env.PORT || this.port)
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(session({
            secret: 'secretkey',
            resave: false,
            saveUninitialized: false,
            store: new MySQLStore(keys.database)
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
    }

    globalVariables() {
        this.app.use((req, res, next) => {
            this.app.locals.message = req.flash('message');
            this.app.locals = req.user;
            next();
        })
    }

    routes() {
        this.app.use(auth);
        this.app.use(posts);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}