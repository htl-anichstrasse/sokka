import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPUpdateConfigRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPUpdateConfigRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updateconfig', this.post);
        this.fullpath = '/acp/updateconfig';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.configKey) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
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
            res.send({ success: false, message: 'An unknown error occurred while updating config entry' });
            this.logger.error(`An unknown error occurred while updating config entry: ${err}`);
        }
    }
}

export default new ACPUpdateConfigRoute();
