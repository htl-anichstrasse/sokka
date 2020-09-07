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
        res.send({ success: true, message: 'This domain serves as Sokkas backend gateway. It is not intended for public use.' });
    }
}

export default new RootRoute();
