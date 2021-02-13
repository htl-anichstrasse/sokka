import { Request, Response, Router } from 'express';
import MenuTitle from '../../../../models/menu/MenuTitle';
import Route from '../../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../../RouteAnnotations';

class ACPGetMenuTitleRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/menu/title/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let menutitles = await MenuTitle.getAll();
            res.send({ success: true, menutitles: menutitles });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching menu titles' });
        }
    }
}

export default new ACPGetMenuTitleRoute();
