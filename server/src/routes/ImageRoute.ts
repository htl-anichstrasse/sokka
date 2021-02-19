import { Request, Response, Router } from 'express';
import Images from '../Images';
import Route from '../Route';
import { NeedsProperties } from './RouteAnnotations';

class ImageRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/';
        this.router.get('/image', this.get.bind(this));
    }

    @NeedsProperties({ id: 'number' }, true)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let image = await Images.instance.readImage(String(req.query.id));
            res.set({ 'Content-Type': 'image/png' });
            res.send(image);
        } catch (err) {
            if (err.message = 'Image not found') {
                res.status(404);
                res.send({ success: false, message: 'Image not found' });
                return;
            } res.status(500);
            res.send({ success: false, message: 'Image could not be loaded' });
        }
    }
}

export default new ImageRoute();
