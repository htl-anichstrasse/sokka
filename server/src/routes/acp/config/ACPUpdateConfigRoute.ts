import { Request, Response, Router } from 'express';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateConfigRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updateconfig', this.post.bind(this));
        this.fullpath = '/acp/updateconfig';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ configKey: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let configEntry = await ACPConfigValue.get(req.body.configKey);
            if (req.body.configValue) {
                configEntry.configValue = req.body.configValue;
            }
            if (req.body.friendlyName) {
                configEntry.friendlyName = req.body.friendlyName;
            }
            if (req.body.type) {
                configEntry.type = req.body.type;
            }
            await configEntry.update();
        } catch (err) {
            if (err.message === 'Config entry not found') {
                res.status(400);
                res.send({ success: false, message: 'This config entry does not exist' });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating config entry '${req.body.configKey}'` });
            this.logger.error(`An unknown error occurred while updating config entry '${req.body.configKey}': ${err}`);
        }
    }
}

export default new ACPUpdateConfigRoute();
