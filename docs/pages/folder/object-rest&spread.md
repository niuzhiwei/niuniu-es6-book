# Object Rest & Spread
前面在ES6中的function中写过Rest & Spread方法。
在ES9新增Object的Rest & Spread方法。
```js
const input = {
    a:1,
    b:2
}
const output = {
    ...input,
    c:3
}
console.log(output) //{a: 1, b: 2, c: 3}
```
```js
const input = {
    a:1,
    b:2,
    c:3
}
let {a,...rest} = input
console.log(a,rest) //1 {b: 2, c: 3}
```