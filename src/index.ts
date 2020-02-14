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
    new Function("return async()=>{}")()();

    function AsyncLimiterClass(this: any, max: number) {
        const asynclimiter = createlimiter(max);
        if (this && this instanceof AsyncLimiterClass) {
            Object.assign(this, asynclimiter);
            return this as EventEmitterTarget;
        } else {
            return asynclimiter;
        }
    }
    return AsyncLimiterClass as AsyncLimiterConstructor;
})();
