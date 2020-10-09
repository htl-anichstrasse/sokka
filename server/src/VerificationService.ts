import * as log4js from 'log4js';
import config from './Config';
import Database from "./Database";
import User from "./models/User";
import nodemailer = require('nodemailer');
import Mail = require("nodemailer/lib/mailer");
import crypto = require('crypto');

class VerificationService {
    private mailer: Mail;
    private static readonly logger = log4js.getLogger('VerificationService');

    constructor() {
        Promise.all([config.readConfigValue('VERIFY_EMAIL'), config.readConfigValue('VERIFY_EMAIL_PASSWORD')]).then((values) => {
            this.mailer = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: values[0],
                    pass: values[1]
                }
            });
            VerificationService.logger.info('Successfully initialized verification service');
        }).catch((err) => {
            VerificationService.logger.error(`Could not enable verification service: ${err}`);
        });
    }

    private storeVerificationURL(user: User): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let token = crypto.randomBytes(64).toString('base64');
            Database.instance.query("INSERT INTO sokka_verification_urls (user_id, token) VALUES (?, ?);", [user.id, token]).then(() => {
                resolve(token);
            }).catch((err) => reject(err));
        });
    }

    public isVerificationIDValid(token: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Database.instance.query("SELECT COUNT(*) FROM sokka_verification_urls WHERE token = ?;", [token]).then((result) => {
                resolve(result.length > 0);
            }).catch((err) => reject(err));
        });
    }

    public getVerificationUserForToken(token: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query("SELECT user_id FROM sokka_verification_urls WHERE token = ?;", [token]).then((result) => {
                if (result.length > 0) {
                    User.getById(result[0].user_id).then((user) => {
                        resolve(user);
                    }).catch((err) => reject(err));
                } else {
                    reject('User could not be found for this token');
                }
            }).catch((err) => reject(err));
        });
    }

    public verifyUser(user: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query("DELETE FROM sokka_verification_urls WHERE user_id = ?;", [user.id]).then(() => {
                user.verify().then(() => resolve(null)).catch((err) => reject(err));
            }).catch((err) => reject(err));
        });
    }

    public sendVerification(user: User): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storeVerificationURL(user).then((token) => {
                this.mailer.sendMail({
                    from: 'Sokka noreply@sokka.me',
                    to: user.email,
                    subject: 'Verification Mail — Sokka',
                    text: `Hi, Sokka here. Please click the following URL to activated your account: https://api.sokka.me/verify?id=${token}`
                }, (err, info) => {
                    if (err) reject(err);
                    resolve(info);
                });
            }).catch((err) => reject(err));
        });
    }
}

export default new VerificationService();
