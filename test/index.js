import limiterClass from "../dist/index.js";
console.dir(limiterClass);
const limiter = limiterClass(30);
import assert from "assert";
const listener = (data) => console.log(JSON.stringify(data));

limiter.target.on("free", listener);

limiter.target.on("full", listener);
console.log(limiter);
async function asyncread() {
    return await new Promise((s) => {
        setTimeout(() => {
            s("data:" + Math.random());
        }, Math.random() * 100);
    });
}

const limitread = limiter.asyncwrap(asyncread);
const results = [];
for (let i = 0; i < 100; i++) {
    results.push(limiter.run(() => asyncread()));
    results.push(
        new Promise((s, j) => {
            setTimeout(() => {
                limitread()
                    .then((d) => {
                        console.log(d);
                        s(d);
                    })
                    .catch(j);
            }, Math.random() * 100);
        })
    );
}

const ps = await Promise.all(results);
assert(ps.length === 200);
assert(ps.every((d) => typeof d === "string"));
console.log(ps);
