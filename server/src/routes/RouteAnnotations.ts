import { Request, Response } from "express";
import ACPSession from "../models/acp/ACPSession";
import Session from "../models/Session";

export enum AuthorizationType {
    ACP,
    App
}

/**
 * This annotation checks whether an authentication bearer was transmitted with a received request. And
 * if there was, the annotation will check whether it is valid. If the token does not exist or is
 * invalid, the annotation will deem the request invalid and respond with a HTTP 401.
 * 
 * Attention: This annotation MUST be the first on the route, otherwise the authorization will not be
 * checked first, which is important for security reasons.
 * 
 * @param authorizationType the authorization type for this route
 */
export function NeedsAuthorization(authorizationType: AuthorizationType) {
    return (target, propertyKey, descriptor) => {
        const originalFunction = descriptor.value;
        descriptor.value = async function (req: Request, res: Response) {
            if (!req.token) {
                res.status(401);
                res.send({ success: false, message: 'Authorization required' });
                return;
            }
            try {
                if (authorizationType === AuthorizationType.ACP) {
                    let session = await ACPSession.get(req.token);
                    if (!session) {
                        throw new Error('ACP session not found');
                    }
                } else {
                    let session = await Session.get(req.token);
                    if (!session) {
                        throw new Error('Session not found');
                    }
                }
            } catch {
                res.status(401);
                res.send({ success: false, message: 'Authorization required' });
                return;
            }
            return originalFunction.bind(this)(req, res);
        }
    };
}

/**
 * Annotation for requiring parameters in REST route. This annotation makes a *strict* property check, 
 * which means that any additional values to the request will render the request invalid. For example:
 * 
 * The request format is supposed to be:
 * { name: 'string', salary: 'number' }
 * 
 * If the REST request were to be in the format:
 * { name: 'string', salary: 'number', iq: 'number' }
 * 
 * ... this annotation will deem the request as invalid and respond with a HTTP 400.
 * 
 * @param properties the needed properties in the format { <propertyName>: <propertyType: string>, ... }
 */
export function NeedsProperties(properties: any) {
    return (target, propertyKey, descriptor) => {
        const originalFunction = descriptor.value;
        descriptor.value = async function (req: Request, res: Response) {
            for (let property of Object.keys(properties)) {
                if (Object.keys(properties).length !== Object.keys(req.body).length
                    || !req.body[property]
                    || typeof req.body[property] !== properties[property]) {
                    res.status(400);
                    res.send({ success: false, message: 'Invalid parameters' });
                    return;
                }
            }
            return originalFunction.bind(this)(req, res);
        }
    }
}