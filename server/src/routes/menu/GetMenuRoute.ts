import { Request, Response, Router } from 'express';
import Menu from '../../models/menu/Menu';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization } from '../RouteAnnotations';

class GetMenuRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/menu';
        this.router.get('/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.App)
    private async get(req: Request, res: Response): Promise<void> {
        let menus;
        const id = parseInt(String(req.query.id));
        if (!isNaN(id)) {
            menus = [await Menu.get(id)];
        } else {
            menus = await Menu.getAll();
        }
        for (let i = 0; i < menus.length; i++) {
            menus[i]['category'] = await menus[i].getCategory();
            menus[i]['entries'] = await menus[i].getEntries();
            delete menus[i]['category_id'];
            for (let j = 0; j < menus[i]['entries'].length; j++) {
                delete menus[i]['entries'][j].id;
            }
        }
        res.send({
            success: true,
            data: menus
        });
    }
}

export default new GetMenuRoute();
