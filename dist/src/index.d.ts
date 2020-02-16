import { AsyncCurrentLimiter } from "./AsyncCurrentLimiter";
import { createlimiter } from "./createlimiter";
import { statusdata } from "./status-event";
interface Constructor<T extends (...args: any[]) => any> {
    new (...args: Parameters<T>): ReturnType<T>;
    (...args: Parameters<T>): ReturnType<T>;
}
export declare type AsyncLimiterConstructor = Constructor<typeof createlimiter>;
export { AsyncCurrentLimiter };
export { statusdata };
declare const _default: AsyncLimiterConstructor;
export default _default;
