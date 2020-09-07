import * as log4js from 'log4js';
import { Connection, createConnection, queryCallback } from 'mysql';

class Database {
    private logger: log4js.Logger;
    private connection: Connection;

    constructor() {
        this.logger = log4js.getLogger('Database');
        this.connection = createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD
        });
        this.logger.info('Connecting to MySQL...');
        this.connection.connect((err) => {
            if (err) throw err;
            this.logger.info('Successfully connected to MySQL');
        })
    }

    query(query: string, values?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let callback: queryCallback = (err, results) => {
                if (err) {
                    this.logger.error(`Could not complete SQL request '${query}'`);
                    reject(err);
                }
                resolve(results);
            };
            if (values) {
                this.connection.query(query, values, callback);
            } else {
                this.connection.query(query, callback);
            }
        });
    }

}

export default new Database();