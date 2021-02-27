import Axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
const debug = true;

function getBaseURL() {
    return `${isDebug() ? 'http://localhost:3001' : 'https://api.sokka.me'}`;
}

function formatCurrency(price: number) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
}

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
        let cookies = new Cookies();
        let bearer = cookies.get('sokka_token');
        let username = cookies.get('sokka_username');
        if (authNeeded && (!bearer || !username)) {
            reject('Auth token or username not available');
            return;
        }
        let defaultHeaders = { 'Content-Type': 'application/json' };
        let reqHeaders = authNeeded ? { 'Authorization': `Bearer ${btoa(username + ':' + bearer)}`, ...defaultHeaders } : defaultHeaders;
        Axios({
            url: `${getBaseURL()}${node}`,
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

export { formatCurrency, getBaseURL, animateCSS, sendRequest };

