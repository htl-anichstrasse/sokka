import * as log4js from 'log4js';
import { Connection, createConnection, queryCallback } from 'mysql';
import config from './Config';

class Database {
    private readonly logger: log4js.Logger;
    private readonly connection: Connection;
    static instance: Database;

    private constructor(callback: () => void) {
        this.logger = log4js.getLogger('Database');
        this.connection = createConnection({
            host: config.readConfigValueSync('MYSQL_HOST'),
            user: config.readConfigValueSync('MYSQL_USERNAME'),
            password: config.readConfigValueSync('MYSQL_PASSWORD'),
            database: config.readConfigValueSync('MYSQL_DB')
        });
        this.logger.info('Connecting to MySQL...');
        this.connection.connect((err) => {
            if (err) throw err;
            this.logger.info('Successfully connected to MySQL');
            callback();
        });
    }

    static create(): Promise<Database> {
        return new Promise<Database>((resolve) => {
            if (Database.instance) {
                throw 'Database already created!';
            }
            let callback = () => {
                resolve(Database.instance);
            }
            Database.instance = new Database(callback);
        });
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

export default Database;