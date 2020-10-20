import { Router } from 'express';
import AuthMiddleware from './middlewares/AuthMiddleware';
import { UserController } from './controllers/UserController';
import passport from 'passport';

export class Routes {
    public router: Router;

    public authMiddleware: AuthMiddleware = new AuthMiddleware();
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', function (req, res) {
            res.send('Hello World!');
        });

        /** User routes */

        this.router.post('/sign_up', this.userController.registerUser);
        this.router.post('/sign_in', passport.authenticate('local'), this.userController.authenticateUser);
    }
}
