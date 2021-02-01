import { Request, Response, Router } from 'express';
import MenuTitle from '../../models/menu/MenuTitle';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../RouteAnnotations';

class GetMenuTitleRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/menu/title';
        this.router.get('/get', this.get.bind(this));
    }

    @NeedsProperties({ id: 'number' }, true)
    @NeedsAuthorization(AuthorizationType.App)
    private async get(req: Request, res: Response): Promise<void> {
        let title = await MenuTitle.get(parseInt(String(req.query.id)));
        if (!title) {
            res.status(400);
            res.send({ success: false, message: 'Menu title not found' });
            return;
        }
        res.send({
            success: true,
            data: title
        });
    }
}

export default new GetMenuTitleRoute();
