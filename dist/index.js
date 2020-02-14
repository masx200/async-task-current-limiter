function t(t){if("string"!=typeof t&&"symbol"!=typeof t)throw new TypeError(" EVENTNAME expected: string | symbol;but invalid :"+t)}function e(t){if("function"!=typeof t)throw new TypeError(" EVENTLISTENER expected: (event?: any) => void;but invalid:"+t)}const n="EventEmitterTarget";function o(){return {}.toString.call({[Symbol.toStringTag]:n})}function i(){const r=function(){const i=new Map,r=new WeakMap;function s(t){let e=i.get(t);return e||(e=new Set,i.set(t,e)),e}function c(e){t(e),i.has(e)&&s(e).clear();}function u(e,n){t(e),i.has(e)&&s(e).forEach(t=>{Promise.resolve().then(()=>{t(n);});});}function f(n,o){t(n),e(o),s(n).add(o);}function a(t,e){s(t).delete(e);}function l(n,o){t(n),e(o),a(n,o),function(t,e){const n=s(t);let o=r.get(e);o&&n.delete(o);}(n,o);}function m(){return [...i].map(([t,e])=>[t,[...e]])[Symbol.iterator]()}return {[Symbol.toPrimitive]:o,[Symbol.toStringTag]:n,[Symbol.iterator]:m,entries:m,listenerCount:function(e){return t(e),i.has(e)?s(e).size:0},clear:c,removeAllListeners:c,on:f,addListener:f,off:l,removeListener:l,once:function(n,o){t(n),e(o);let i=!1,s=r.get(o);if(!s){const t=e=>{a(n,t),a(n,o),i||(i=!0,o(e));};s=t,r.set(o,s);}a(n,o),f(n,s);},emit:u,dispatch:u,eventNames:function(){return [...i.keys()]},listeners:function(e){return t(e),i.has(e)?[...s(e)]:[]}}}();return this&&this instanceof i?(Object.assign(this,r),this):r}

function promisedefer() {
    let resolve = (value) => void 0;
    let reject = (reason) => void 0;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, reject, resolve };
}

function createlimiter(max) {
    if (!(typeof max === "number" && max > 0 && Infinity > max)) {
        throw TypeError(" MAX expected: number;but invalid:" + max);
    }
    const 同时读取的最大文件数 = max;
    const cachepromise = new Map();
    let pointer = 0;
    let 当前同时读取的文件数 = 0;
    const target = i();
    const queue = [];
    let shouldrun = true;
    target.on("free", () => {
        shouldrun = true;
        next();
    });
    target.on("full", () => {
        shouldrun = false;
    });
    function next() {
        const index = pointer;
        if (!shouldrun) {
            return;
        }
        if (index >= queue.length) {
            shouldrun = false;
            return;
        }
        if (status() === "full") {
            shouldrun = false;
            return;
        }
        incre();
        const funargs = queue[index];
        if (!funargs) {
            throw Error();
        }
        const [fun, args] = funargs;
        const promise = Promise.resolve(Reflect.apply(fun, undefined, args));
        const settle = () => {
            const defer = cachepromise.get(index);
            if (defer) {
                defer.resolve(promise);
            }
            else {
                throw new Error();
            }
            decre();
            queue[index] = undefined;
        };
        promise.then(settle, settle);
        pointer++;
        Promise.resolve().then(() => {
            next();
        });
    }
    function add(funargs) {
        let index = queue.length;
        queue.push(funargs);
        if (status() === "free") {
            shouldrun = true;
            next();
        }
        const defer = promisedefer();
        cachepromise.set(index, defer);
        return Promise.resolve(defer.promise);
    }
    function status() {
        return 当前同时读取的文件数 < 同时读取的最大文件数 ? "free" : "full";
    }
    const asyncwrap = function (fun) {
        return async function (...args) {
            return await add([fun, args]);
        };
    };
    const 文件读取队列 = {
        [Symbol.toStringTag]: "AsyncCurrentLimiter",
        asyncwrap,
        status,
        limiter: {
            get max() {
                return 同时读取的最大文件数;
            },
            get current() {
                return 当前同时读取的文件数;
            }
        },
        queue: {
            get max() {
                return queue.length;
            },
            get current() {
                return pointer;
            }
        },
        target
    };
    function decre() {
        if (当前同时读取的文件数 - 1 < 0) {
            throw Error();
        }
        当前同时读取的文件数--;
        dispatchstatus();
    }
    function dispatchstatus() {
        const { queue, limiter } = 文件读取队列;
        const data = {
            status: status(),
            queue: { max: queue.max, current: queue.current },
            limiter: { max: limiter.max, current: limiter.current }
        };
        if (当前同时读取的文件数 >= 同时读取的最大文件数) {
            target.emit("full", data);
        }
        else {
            target.emit("free", data);
        }
    }
    function incre() {
        if (当前同时读取的文件数 < 同时读取的最大文件数) {
            当前同时读取的文件数++;
            dispatchstatus();
        }
        else {
            throw Error();
        }
    }
    return 文件读取队列;
}

var index = (() => {
    new Function("return async()=>{}")()();
    function AsyncLimiterClass(max) {
        const asynclimiter = createlimiter(max);
        if (this && this instanceof AsyncLimiterClass) {
            Object.assign(this, asynclimiter);
            return this;
        }
        else {
            return asynclimiter;
        }
    }
    return AsyncLimiterClass;
})();

export default index;
//# sourceMappingURL=index.js.map
