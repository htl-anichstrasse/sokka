import { Request, Response, Router } from 'express';
import Menu from '../../../models/menu/Menu';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateMenuRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/menu/update', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        let menu;
        try {
            menu = await Menu.get(req.body.id);
            if (!menu) {
                throw new Error('Menu not found');
            }
        } catch (err) {
            res.status(400);
            res.send({ success: false, message: err.message });
            return;
        }
        if (req.body.category_id) {
            menu.category_id = req.body.category_id;
        }
        if (req.body.name) {
            menu.name = req.body.name;
        }
        if (req.body.image_id) {
            menu.image_id = req.body.image_id;
        }
        if (req.body.price) {
            menu.price = req.body.price;
        }
        try {
            await menu.update();
            res.send({ success: true, message: 'Successfully updated menu' });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating menu with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while updating menu with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPUpdateMenuRoute();
