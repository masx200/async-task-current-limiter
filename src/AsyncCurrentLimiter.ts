import { 空闲状态 } from "./createlimiter";
import { EventEmitterTarget } from "@masx200/event-emitter-target";
import { StatusData } from "./status-event";
export interface AsyncCurrentLimiter {
    [Symbol.toStringTag]: string;
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
    //@ts-ignore
    target: EventEmitterTarget<{
        full: StatusData;
        free: StatusData;
    }>;
    // {
    //     [Symbol.toPrimitive]: () => string;
    //     [Symbol.toStringTag]: string;
    //     [Symbol.iterator]: () => IterableIterator<
    //         [
    //             import("@masx200/event-emitter-target").EVENTNAME,
    //             import("@masx200/event-emitter-target").EVENTLISTENER[]
    //         ]
    //     >;
    //     entries: () => IterableIterator<
    //         [
    //             import("@masx200/event-emitter-target").EVENTNAME,
    //             import("@masx200/event-emitter-target").EVENTLISTENER[]
    //         ]
    //     >;
    //     listenerCount: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME
    //     ) => number;
    //     clear: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME
    //     ) => void;
    //     removeAllListeners: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME
    //     ) => void;
    //     on: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         callback: import("@masx200/event-emitter-target").EVENTLISTENER
    //     ) => void;
    //     addListener: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         callback: import("@masx200/event-emitter-target").EVENTLISTENER
    //     ) => void;
    //     off: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         callback: import("@masx200/event-emitter-target").EVENTLISTENER
    //     ) => void;
    //     removeListener: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         callback: import("@masx200/event-emitter-target").EVENTLISTENER
    //     ) => void;
    //     once: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         callback: import("@masx200/event-emitter-target").EVENTLISTENER
    //     ) => void;
    //     emit: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         event?: any
    //     ) => void;
    //     dispatch: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME,
    //         event?: any
    //     ) => void;
    //     eventNames: () => import("@masx200/event-emitter-target").EVENTNAME[];
    //     listeners: (
    //         name: import("@masx200/event-emitter-target").EVENTNAME
    //     ) => import("@masx200/event-emitter-target").EVENTLISTENER[];
    // };
}
