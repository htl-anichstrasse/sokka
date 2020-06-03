import { NextFunction, Request, Response, Router } from 'express';
import Route from '../Route';

class RootRoute implements Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        this.router = Router();
        this.path = '/';
        this.router.get(this.path, this.get);
    }

    private get(req: Request, res: Response, next: NextFunction): void {
        res.send({ message: 'Hello World' });
    }
}

export default new RootRoute();
