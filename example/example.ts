import fs from "fs";
import AsyncLimiterClass from "@masx200/async-task-current-limiter";
const asynclimiter = AsyncLimiterClass(70);

declare const files: string[];
const limitreadfile = asynclimiter.asyncwrap(fs.promises.readFile);
files.forEach(async file => {
    const buf = await limitreadfile(file);
    console.log(buf);
});
