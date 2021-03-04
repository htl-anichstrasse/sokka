import { Request, Response, Router } from 'express';
import Images from '../../Images';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';

class ACPImageRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/image', this.post.bind(this));
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
