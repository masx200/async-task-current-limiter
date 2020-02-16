import { 空闲状态 } from "./createlimiter";
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
    target: import("@masx200/event-emitter-target").EventEmitterTarget;
}
