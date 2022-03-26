import { EventEmitterTarget } from "@masx200/event-emitter-target";
type 空闲状态 = "free" | "full";
declare function createlimiter(max: number): AsyncCurrentLimiter;
interface AsyncCurrentLimiter {
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
    target: EventEmitterTarget;
}
interface statusdata {
    status: 空闲状态;
    queue: {
        max: number;
        current: number;
    };
    limiter: {
        max: number;
        current: number;
    };
}
interface Constructor<T extends (...args: any[]) => any> {
    new (...args: Parameters<T>): ReturnType<T>;
    (...args: Parameters<T>): ReturnType<T>;
}
type AsyncLimiterConstructor = Constructor<typeof createlimiter>;
declare const _default: AsyncLimiterConstructor;
export { _default as default, AsyncLimiterConstructor, AsyncCurrentLimiter, statusdata };
