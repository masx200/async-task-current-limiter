import { EventEmitterTarget } from "@masx200/event-emitter-target";
import { AsyncCurrentLimiter } from "./AsyncCurrentLimiter";
import { createlimiter } from "./createlimiter";
import { statusdata } from "./status-event";

interface Constructor<T extends (...args: any[]) => any> {
    new (...args: Parameters<T>): ReturnType<T>;
    (...args: Parameters<T>): ReturnType<T>;
}
export type AsyncLimiterConstructor = Constructor<typeof createlimiter>;
export { AsyncCurrentLimiter };
export { statusdata };
export default (() => {
    /* 检测是否支持async函数 */
    var b = new Function("return async()=>{}")()();
    var a = Symbol();
    function AsyncLimiterClass(this: any, max: number) {
        const asynclimiter = createlimiter(max);
        if (this && this instanceof AsyncLimiterClass) {
            Object.assign(this, asynclimiter);
            return this as EventEmitterTarget;
        } else {
            return Reflect.construct(AsyncLimiterClass, [max]);
        }
    }
    Reflect.set(AsyncLimiterClass, a, b);
    return AsyncLimiterClass as AsyncLimiterConstructor;
})();
