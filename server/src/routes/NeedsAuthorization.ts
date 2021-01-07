import { NextFunction, Request, Response } from "express";
import ACPSession from "../models/acp/ACPSession";
import Session from "../models/Session";

export function NeedsAuthorization(authorizationType: AuthorizationType) {
    return (target, propertyKey, descriptor) => {
        const originalFunction = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            if (!req.token) {
                res.status(401);
                res.send({ success: false, message: 'Authorization required' });
                return;
            }
            try {
                if (authorizationType === AuthorizationType.ACP) {
                    await ACPSession.get(req.token);
                } else {
                    await Session.get(req.token);
                }
            } catch {
                res.status(401);
                res.send({ success: false, message: 'Authorization required' });
                return;
            }
            return originalFunction.bind(this)(req, res, next);
        }
    };
}

export enum AuthorizationType {
    ACP,
    App
}