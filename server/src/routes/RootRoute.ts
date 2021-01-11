import { Request, Response, Router } from 'express';
import Route from '../Route';

class RootRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/';
        this.router.get('/', this.get.bind(this));
        this.fullpath = '/';
    }

    private async get(req: Request, res: Response): Promise<void> {
        res.send({ success: true, message: 'This domain serves as Sokkas backend gateway. It is not intended for public use.' });
    }
}

export default new RootRoute();
