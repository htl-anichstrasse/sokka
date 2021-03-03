import { Request, Response, Router } from 'express';
import Menu from '../../../models/menu/Menu';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteMenuRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/menu/delete', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let menu = await Menu.get(req.body.id);
            if (!menu) {
                throw new Error('Menu not found');
            }
            await menu.delete();
            res.send({ success: true, message: `Successfully deleted menu with id '${req.body.id}'` });
        } catch (err) {
            if (err.message === 'Menu not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while deleting menu with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while deleting menu with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPDeleteMenuRoute();
