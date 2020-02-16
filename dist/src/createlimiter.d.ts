export declare type 空闲状态 = "free" | "full";
import { AsyncCurrentLimiter } from "./AsyncCurrentLimiter";
export declare function createlimiter(max: number): AsyncCurrentLimiter;
