import { Request, Response, Router } from 'express';
import Database from '../../Database';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization } from '../RouteAnnotations';
import os = require('os-utils');

class ACPStatusRoute extends Route {
    readonly router: Router;
    readonly path: string;
    resCache: { res: {}, time: number } = {
        res: {},
        time: 0
    }

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/status', this.get.bind(this));
    }

    private async getCountFromDatabase(query: string): Promise<number> {
        return (await Database.instance.query(query))[0]['COUNT(*)'];
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        if (this.resCache.time + 5000 > new Date().getTime()) {
            res.send(this.resCache.res);
            return;
        }
        os.cpuUsage(async (percent) => {
            this.resCache = {
                res: {
                    sucess: true,
                    status: {
                        users: await this.getCountFromDatabase('SELECT COUNT(*) FROM sokka_users;'),
                        ordersToday: await this.getCountFromDatabase('SELECT COUNT(*) FROM sokka_orders WHERE DATE(timestamp) = CURDATE();'),
                        registeredProducts: await this.getCountFromDatabase('SELECT COUNT(*) FROM sokka_products;'),
                        registeredMenus: await this.getCountFromDatabase('SELECT COUNT(*) FROM sokka_menus;'),
                        sysUptime: os.sysUptime(),
                        procUptime: os.processUptime(),
                        totalMem: os.totalmem(),
                        freeMem: os.freemem(),
                        platform: os.platform(),
                        cpuCount: os.cpuCount(),
                        cpuUsage: percent
                    }
                },
                time: new Date().getTime()
            }
            res.send(this.resCache.res);
        });
    }
}

export default new ACPStatusRoute();
