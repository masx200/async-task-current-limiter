import { EventEmitterTarget } from "@masx200/event-emitter-target";
import { AsyncCurrentLimiter } from "./AsyncCurrentLimiter";
import { createlimiter } from "./createlimiter";
import { StatusData } from "./status-event";
export { 空闲状态 } from "./createlimiter";
export interface Constructor<T extends (...args: any[]) => any> {
    new (...args: Parameters<T>): ReturnType<T>;
    (...args: Parameters<T>): ReturnType<T>;
}
export type AsyncLimiterConstructor = Constructor<typeof createlimiter>;
export { AsyncCurrentLimiter };
export { StatusData };
export default (() => {
    /* 检测是否支持async函数 */
    try {
        var b = new Function("return async()=>{}")()();
        var a = Symbol();
        Reflect.set(AsyncLimiterClass, a, b);
        Reflect.set(AsyncLimiterClass, a, undefined);
    } catch {}

    function AsyncLimiterClass(this: any, max: number) {
        const asynclimiter = createlimiter(max);
        if (this && this instanceof AsyncLimiterClass) {
            Object.assign(this, asynclimiter);
            return this as EventEmitterTarget;
        } else {
            return Reflect.construct(AsyncLimiterClass, [max]);
        }
    }

    return AsyncLimiterClass as AsyncLimiterConstructor;
})();
