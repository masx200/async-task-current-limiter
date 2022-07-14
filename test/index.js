import limiterClass from "../dist/index.js";
console.dir(limiterClass);
const limiter = limiterClass(30);
import assert from "assert"
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
const results=[]
for (let i = 0; i < 500; i++) {


results.push(new Promise((s,j)=>{
setTimeout(() => {
        limitread().then(d=>{
console.log(d)
s(d)

}).catch(j);
    }, Math.random() * 1000);

}))

    
}
console.log(limiter);
const ps=await Promise.all(results)
assert(ps.length===500)
assert(ps.every(d=>typeof d==="string"))
console.log(ps)
