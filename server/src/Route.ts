import { Router } from "express";

export default interface Route {
    readonly router: Router,
    readonly path: string
}