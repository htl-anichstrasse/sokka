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
        this.router.post('/updateconfig', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ configEntry: 'object' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let configEntry = await ConfigEntry.get(req.body.configEntry.key);
            if (req.body.configEntry.value) {
                configEntry.value = req.body.configEntry.value;
            }
            if (req.body.configEntry.friendlyName) {
                configEntry.friendlyName = req.body.configEntry.friendlyName;
            }
            if (req.body.type) {
                configEntry.type = req.body.configEntry.type;
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
            res.send({ success: false, message: `An unknown error occurred while updating config entry '${req.body.configEntry.key}'` });
            this.logger.error(`An unknown error occurred while updating config entry '${req.body.configEntry.key}': ${err}`);
        }
    }
}

export default new ACPUpdateConfigRoute();
