# Symbol扩展
## Symbol.prototype.description
我们知道,Symbol的描述只能被存储在内部的```Description```，没有直接对外暴露，我们只有调用Symbol的toString()时才可以读取这个属性:
```js
const name = Symbol('test')
console.log(name.toString()) //Symbol(test)
```
现在跨域通过description方法获取Symbol的描述：
```js
const name = Symbol('test')
console.log(name.description)//test
```