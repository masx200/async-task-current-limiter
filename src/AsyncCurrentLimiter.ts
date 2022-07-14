import { 空闲状态 } from "./createlimiter";
import { EventEmitterTarget } from "@masx200/event-emitter-target";
import { StatusData } from "./status-event";
export interface AsyncCurrentLimiter {
    run<T>(call: () => Promise<T>): Promise<T>;
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
}
