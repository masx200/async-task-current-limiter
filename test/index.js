import limiterClass from "../dist/index.min.js";
console.dir(limiterClass);
const limiter = limiterClass(30);

const listener = data => console.log(JSON.stringify(data));

limiter.target.on("free", listener);

limiter.target.on("full", listener);

async function asyncread() {
    return await new Promise(s => {
        setTimeout(() => {
            s("data:" + Math.random());
        }, Math.random() * 1000);
    });
}

const limitread = limiter.asyncwrap(asyncread);

for (let i = 0; i < 500; i++) {
    setTimeout(() => {
        limitread().then(console.log);
    }, Math.random() * 1000);
}
console.log(limiter);
