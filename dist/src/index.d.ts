import { statusdata } from "./status-event";
import { createlimiter } from "./createlimiter";
interface Constructor<T extends (...args: any[]) => any> {
    new (...args: Parameters<T>): ReturnType<T>;
    (...args: Parameters<T>): ReturnType<T>;
}
export declare type AsyncLimiterConstructor = Constructor<typeof createlimiter>;
declare const _default: AsyncLimiterConstructor;
export default _default;
export { statusdata };
