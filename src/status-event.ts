import { 空闲状态 } from "./createlimiter";

export interface statusdata {
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
