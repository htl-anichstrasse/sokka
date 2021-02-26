import { Request, Response, Router } from 'express';
import Menu from '../../../models/menu/Menu';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPCreateMenuRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/menu/create', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ name: 'string', category_id: 'number', image_id: 'string', price: 'number', entries: 'object' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let menu = await Menu.create(req.body.category_id, req.body.name, req.body.image_id, req.body.price);
            res.send({ success: true, message: `Successfully created menu with id '${menu.id}'` });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while creating menu '${req.body.name}'` });
            this.logger.error(`An unknown error occured while creating menu '${req.body.name}': ${err}`);
        }
    }
}

export default new ACPCreateMenuRoute();
