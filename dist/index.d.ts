interface Constructor<T extends (...args: any[]) => any> {
    new (...args: Parameters<T>): ReturnType<T>;
    (...args: Parameters<T>): ReturnType<T>;
}
export declare type AsyncLimiterConstructor = Constructor<typeof 创建异步限流队列>;
declare const AsyncLimiterClass: AsyncLimiterConstructor;
export default AsyncLimiterClass;
export declare type 空闲状态 = "free" | "full";
export interface FUNANDARGS<T, S extends FUNRETPRO<T>> extends Array<any> {
    0: S;
    1: Parameters<S>;
    length: 2;
}
declare type FUNRETPRO<T> = (...arg: any[]) => Promise<T>;
export declare type 队列类型 = ReturnType<typeof 创建异步限流队列>;
declare function 创建异步限流队列(max: number): {
    asyncwrap: <T extends (...args: any[]) => Promise<any>>(fun: T) => T;
    status: () => 空闲状态;
    limiter: {
        readonly max: number;
        readonly current: number;
    };
    queue: {
        readonly max: number;
        readonly current: number;
    };
    target: {
        [Symbol.toPrimitive]: () => string;
        [Symbol.toStringTag]: string;
        [Symbol.iterator]: () => IterableIterator<[import("@masx200/event-emitter-target").EVENTNAME, import("@masx200/event-emitter-target").EVENTLISTENER[]]>;
        entries: () => IterableIterator<[import("@masx200/event-emitter-target").EVENTNAME, import("@masx200/event-emitter-target").EVENTLISTENER[]]>;
        listenerCount: (name: import("@masx200/event-emitter-target").EVENTNAME) => number;
        clear: (name: import("@masx200/event-emitter-target").EVENTNAME) => void;
        removeAllListeners: (name: import("@masx200/event-emitter-target").EVENTNAME) => void;
        on: (name: import("@masx200/event-emitter-target").EVENTNAME, callback: import("@masx200/event-emitter-target").EVENTLISTENER) => void;
        addListener: (name: import("@masx200/event-emitter-target").EVENTNAME, callback: import("@masx200/event-emitter-target").EVENTLISTENER) => void;
        off: (name: import("@masx200/event-emitter-target").EVENTNAME, callback: import("@masx200/event-emitter-target").EVENTLISTENER) => void;
        removeListener: (name: import("@masx200/event-emitter-target").EVENTNAME, callback: import("@masx200/event-emitter-target").EVENTLISTENER) => void;
        once: (name: import("@masx200/event-emitter-target").EVENTNAME, callback: import("@masx200/event-emitter-target").EVENTLISTENER) => void;
        emit: (name: import("@masx200/event-emitter-target").EVENTNAME, event?: any) => void;
        dispatch: (name: import("@masx200/event-emitter-target").EVENTNAME, event?: any) => void;
        eventNames: () => import("@masx200/event-emitter-target").EVENTNAME[];
        listeners: (name: import("@masx200/event-emitter-target").EVENTNAME) => import("@masx200/event-emitter-target").EVENTLISTENER[];
    };
};
import { statusdata } from "./status-event";
export { statusdata };
