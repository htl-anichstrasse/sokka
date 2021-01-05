import { NextFunction, Request, Response, Router } from 'express';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import ACPSession from '../../../models/acp/ACPSession';
import Route from '../../../Route';

class ACPUpdateConfigRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updateconfig', this.post);
        this.fullpath = '/acp/updateconfig';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }
        ACPSession.get(req.token).then(() => {
            if (!req.body.configKey) {
                res.status(400);
                res.send({ success: false, message: 'Invalid parameters' });
                return;
            }
            ACPConfigValue.get(req.body.configKey).then((configEntry) => {
                if (req.body.configValue) {
                    configEntry.configValue = req.body.configValue;
                }
                if (req.body.friendlyName) {
                    configEntry.friendlyName = req.body.friendlyName;
                }
                if (req.body.type) {
                    configEntry.type = req.body.type;
                }
                configEntry.update().then(() => {
                    res.send({ success: true, message: 'Config entry updated' });
                }).catch(() => {
                    res.status(500);
                    res.send({ success: false, message: `Could not update config entry with key '${req.body.configKey}'` });
                });
            }).catch((err) => {
                res.status(400);
                res.send({ success: false, message: 'This config entry does not exist' });
            });
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPUpdateConfigRoute();
