export default function promisedefer() {
    let resolve: (value?: any) => void = (value?: any) => void 0;
    let reject: (reason?: any) => void = (reason?: any) => void 0;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, reject, resolve };
}
