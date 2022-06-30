type FUNRETPRO<T> = (...arg: any[]) => Promise<T>;

export type 空闲状态 = "free" | "full";

interface FUNANDARGS<T, S extends FUNRETPRO<T>> extends Array<any> {
    0: S;
    1: Parameters<S>;
    length: 2;
}
import createeventtarget, {
    EventEmitterTarget,
} from "@masx200/event-emitter-target";
import promisedefer from "./promisedefer";
import { AsyncCurrentLimiter } from "./AsyncCurrentLimiter";
import { StatusData } from "./status-event";
// import { FUNANDARGS, FUNRETPRO, 空闲状态 } from './index';
export function createlimiter(max: number): AsyncCurrentLimiter {
    if (!(typeof max === "number" && max > 0 && Infinity > max)) {
        throw TypeError(" MAX expected: number;but invalid:" + max);
    }
    const 同时读取的最大文件数 = max;
    const cachepromise = new Map<number, ReturnType<typeof promisedefer>>();
    // const cachesymbol = new Map<string, symbol>();
    // const getsymbolcached = (name: string) => {
    //     const cached = cachesymbol.get(name);
    //     if (cached) {
    //         return cached;
    //     }
    //     else {
    //         const s = Symbol(name);
    //         cachesymbol.set(name, s);
    //         return s;
    //     }
    // };
    let pointer = 0;
    let 当前同时读取的文件数 = 0;
    //@ts-ignore
    const target: EventEmitterTarget<{
        full: StatusData;
        free: StatusData;
    }> =
        //@ts-ignore
        createeventtarget<{
            full: StatusData;
            free: StatusData;
        }>();
    const queue: (undefined | FUNANDARGS<any, any>)[] = [];
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
            throw Error("accident");
        }
        const [fun, args] = funargs;
        const promise = Promise.resolve(Reflect.apply(fun, undefined, args));
        const settle = () => {
            // target.emit(getsymbolcached("settle" + index), promise);
            const defer = cachepromise.get(index);
            if (defer) {
                defer.resolve(promise);
            } else {
                throw new Error("accident");
            }
            decre();
            /* 内存垃圾回收 */
            queue[index] = undefined;
            cachepromise.delete(index);
        };
        promise.then(settle, settle);
        pointer++;
        Promise.resolve().then(() => {
            next();
        });
    }
    function add<T, S extends FUNRETPRO<T>>(
        funargs: FUNANDARGS<T, S>
    ): Promise<T> {
        let index = queue.length;
        queue.push(funargs);
        if (status() === "free") {
            shouldrun = true;
            next();
        }
        const defer = promisedefer();
        cachepromise.set(index, defer);
        return Promise.resolve(defer.promise) as Promise<T>;
        /*  return new Promise<T>(res => {
            target.once(
                getsymbolcached("settle" + index),
                (settledpromise: Promise<T>) => {
                    res(settledpromise);
                }
            );
        }); */
    }
    function status(): 空闲状态 {
        return 当前同时读取的文件数 < 同时读取的最大文件数 ? "free" : "full";
    }
    const asyncwrap = function <T extends (...args: any[]) => Promise<any>>(
        fun: T
    ): T {
        return async function (...args: Parameters<T>) {
            return await add([fun, args]);
        } as T;
    };
    const 文件读取队列 = {
        [Symbol.toStringTag]: "AsyncCurrentLimiter",
        // add,
        asyncwrap,
        status,
        limiter: {
            get max() {
                return 同时读取的最大文件数;
            },
            get current() {
                return 当前同时读取的文件数;
            },
        },
        queue: {
            get max() {
                return queue.length;
            },
            get current() {
                return pointer;
            },
        },
        target,
    };
    function decre() {
        if (当前同时读取的文件数 - 1 < 0) {
            throw Error("accident");
        }
        当前同时读取的文件数--;
        dispatchstatus();
    }
    function dispatchstatus() {
        const { queue, limiter } = 文件读取队列;
        const data = {
            status: status(),
            queue: { max: queue.max, current: queue.current },
            limiter: { max: limiter.max, current: limiter.current },
        };
        if (当前同时读取的文件数 >= 同时读取的最大文件数) {
            target.emit("full", data);
        } else {
            target.emit("free", data);
        }
    }
    function incre() {
        if (当前同时读取的文件数 < 同时读取的最大文件数) {
            当前同时读取的文件数++;
            dispatchstatus();
        } else {
            throw Error("accident");
        }
    }
    return 文件读取队列;
}
