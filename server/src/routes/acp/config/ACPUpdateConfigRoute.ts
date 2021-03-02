import { Request, Response, Router } from 'express';
import ConfigEntry from '../../../models/ConfigEntry';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateConfigRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/config/update', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ key: 'string' }, false, true)
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let configEntry = await ConfigEntry.get(req.body.key);
            if (!configEntry) {
                throw new Error('Config entry not found');
            }
            if (req.body.value) {
                configEntry.value = req.body.value;
            }
            if (req.body.friendlyName) {
                configEntry.friendlyName = req.body.friendlyName;
            }
            if (req.body.type) {
                configEntry.type = req.body.type;
            }
            await configEntry.update();
            res.send({ success: true, message: 'Successfully updated config entry' });
        } catch (err) {
            if (err.message === 'Config entry not found') {
                res.status(400);
                res.send({ success: false, message: 'This config entry does not exist' });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating config entry '${req.body.key}'` });
            this.logger.error(`An unknown error occurred while updating config entry '${req.body.key}': ${err}`);
        }
    }
}

export default new ACPUpdateConfigRoute();
