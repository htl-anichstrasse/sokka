import Axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import config from './config.json';

function animateCSS(node: HTMLElement, animation: string, prefix = 'animate__'): Promise<void> {
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        node.classList.add(`${prefix}animated`, animationName);
        function handleAnimationEnd() {
            node.classList.remove(`${prefix}animated`, animationName);
            resolve();
        }
        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
}

function sendRequest(node: string, reqMethod: "GET" | "POST", authNeeded: boolean, reqData: {}): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
        let bearer = new Cookies().get('sokka_token');
        if (authNeeded && !bearer) {
            reject('Auth token not available');
            return;
        }
        let reqHeaders = authNeeded ? { 'Authorization': `Bearer ${bearer}` } : {};
        Axios({
            url: `${config.api.url}${node}`,
            method: reqMethod,
            headers: reqHeaders,
            data: reqData
        }).then((response) => {
            if (response.status === 401) {
                new Cookies().set('sokka_token', null);
                reject('Auth token is not valid');
                return;
            }
            resolve(response);
        }).catch((err) => reject(err));
    });
}

export { animateCSS, sendRequest };

