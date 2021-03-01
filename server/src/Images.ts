import * as crypto from 'crypto';
import * as fs from 'fs';
import * as log4js from 'log4js';
import config from './Config';
import Database from './Database';

class Images {
    private readonly pathPrefix = config.readConfigValueSync('DEBUG') ? './images/' : `${__dirname}/../images`;
    private readonly pathSuffix = '.png';
    private readonly logger: log4js.Logger;
    public static instance: Images;

    private constructor() {
        this.logger = log4js.getLogger('Images');
        fs.mkdir(this.pathPrefix, { recursive: true }, (err) => {
            if (err) {
                this.logger.error(`Could not create images directory: ${err}`);
            }
        });
        this.purge.bind(this)();
        setInterval(this.purge.bind(this), 1000 * 60 * 30); // purge every 30 mins
        this.logger.info('Images initialized');
    }

    public static create(): Images {
        if (Images.instance) {
            throw new Error('Images already created!');
        }
        Images.instance = new Images();
        return Images.instance;
    }

    private async purge(): Promise<void> {
        this.logger.debug('Start purging images ...');
        let counter = 0;
        let res = [].concat.apply([], await Promise.all([Database.instance.query('SELECT image_id FROM sokka_products;'), Database.instance.query('SELECT image_id FROM sokka_menus;')])).map(v => v.image_id);
        fs.readdir(this.pathPrefix, (err, files) => {
            if (err) throw err;
            for (let file of files) {
                if (!res.includes(file.split('.')[0])) {
                    counter++;
                    fs.unlink(`${this.pathPrefix}${file}`, (err) => {
                        if (err) throw err;
                    });
                }
            }
            this.logger.debug(`Purged ${counter} image(s)`);
        });
    }

    /**
     * Reads an image from the disk by id
     * @param id the id of the image to be read
     */
    public readImage(id: string): Promise<Buffer> {
        let path = `${this.pathPrefix}${id}${this.pathSuffix}`;
        return new Promise<Buffer>((resolve, reject) => {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (err) {
                    reject(new Error('Image not found'));
                    return;
                }
                fs.readFile(path, (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                });
            });
        });
    }

    /**
     * Saves an image to disk and returns its assigned id
     * @param image the image to be written to the disk
     */
    public saveImage(image: Buffer): Promise<string> {
        let id = crypto.randomBytes(16).toString('hex');
        return new Promise<string>((resolve, reject) => {
            fs.writeFile(`${this.pathPrefix}${id}${this.pathSuffix}`, image, {
                flag: 'w'
            }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(id);
            });
        });
    }
}

export default Images;
