import Axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
const debug = true;

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
            url: `${isDebug() ? 'http://localhost:3001' : 'https://api.sokka.me'}${node}`,
            method: reqMethod,
            headers: reqHeaders,
            data: reqData
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            if (err.message.includes('401')) {
                let cookies = new Cookies();
                cookies.remove('sokka_token');
                cookies.remove('sokka_username');
                console.log("yeet");
                window.location.href = '/'; // redirect to home
                reject('Logged out');
            }
        });
    });
}

function isDebug(): boolean {
    return debug;
}

export { animateCSS, sendRequest };

