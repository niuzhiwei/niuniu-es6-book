# 空值合并运算符
空值合并运算符(??)是一个逻辑运算符。当左侧操作数为null或者undefined时，返回其右侧的操作数。否则返回左侧的操作数。

当我们查询某个属性时，经常会遇到，如果没有该属性就会设置一个默认的值。
```js
const b = 0;
const a = b || 5
console.log(a)//5
```
```js
const b = null
const a = b??123
console.log(a)//123
```