import { Request, Response, Router } from 'express';
import Images from '../../Images';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../RouteAnnotations';

class ACPImageRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/image', this.get.bind(this));
        this.router.post('/image', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
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
            }
            res.status(500);
            res.send({ success: false, message: 'Image could not be loaded' });
        }
    }

    @NeedsProperties({ buffer: 'object' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let id = await Images.instance.saveImage(Buffer.from(req.body.buffer.data));
            res.send({ success: true, message: 'Image saved successfully', id: id });
        } catch (err) {
            this.logger.error(err);
            res.send({ success: false, message: 'An error occurred while saving the image' });
        }
    }
}

export default new ACPImageRoute();
