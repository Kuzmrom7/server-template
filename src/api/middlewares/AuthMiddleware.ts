import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import '../../passport';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
class AuthMiddleware {
    public authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', function (err, user, info) {
            if (err) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            }
            if (!user) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
                req.user = user;
                return next();
            }
        })(req, res, next);
    }

    public authorizeJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', function (err, user, jwtToken) {
            if (err) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            }
            if (!user) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
                const scope = req.baseUrl.split('/').slice(-1)[0];
                const authScope = jwtToken.scope;
                if (authScope && authScope.indexOf(scope) > -1) {
                    return next();
                } else {
                    return res.status(401).json({ status: 'error', code: 'unauthorized' });
                }
            }
        })(req, res, next);
    }

    public authorizeLocal(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
                const token = jwt.sign({ username: user.username }, config.jwtSecret);
                res.status(200).send({ token: token });
            }
        });
    }
}

export default AuthMiddleware;
