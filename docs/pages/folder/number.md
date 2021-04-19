# Number
## 二进制与八进制
在JS中将十进制转化为二进制
```js
const a = 5
console.log(a.toString(2)) //101
```
如何把八进制转化为二进制？
```js
const b = 101
console.log(parseInt(b,2))//5
```
ES6提供了二进制和八进制数值的新的写法，分别用前端0b(0B)和0o(0O)表示。
```js
const a = 0B0101
console.log(a) //5

const b = 0O777
console.log(b)//511
```

## 新增方法
### Number.isFinite()
用来检查一个数值是否为有限，即不是Infinity
```js
Number.isFinite(15)//true
Number.isFinite(0.8)//true
Number.isFinite(NaN)//false
Number.isFinite(Infinity)//false
Number.isFinite(-Infinity)//false
Number.isFinite('foo')//false
Number.isFinite('15')//false
Number.isFinite(true)//false
```
### Number.isNaN()
用来检查一个值是否为NaN
```js
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9 / NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true
```
### Number.parseInt()
ES6将全局方法parseInt()移植到Number对象上面，行为完成保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐渐模块化。
```js
// ES6的写法
Number.parseInt('12.34') // 12
```
### Number.parseFloat()
ES6 将全局方法parseFloat()移植到Number对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
```js
// ES6的写法
Number.parseFloat('123.45#') // 123.45
```
### Number.isInteger()
用来判断一个数值是否为整数
```js
Number.isInteger(25) // true
Number.isInteger(25.1) // false

Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
```
### Number.MAX_SAFE_INTEGER
```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 // true

Number.MAX_SAFE_INTEGER === 9007199254740991 // true
```
### Number.MIN_SAFE_INTEGER
```js
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER // true

Number.MIN_SAFE_INTEGER === -9007199254740991 // true
```
## Math扩展
### Math.trunc()
方法用于去除一个数的小数部分，返回整数部分
```js
console.log(Math.trunc(1.2))//1
console.log(Math.trunc(-1.2))//-1
console.log(Math.trunc(true))//1
console.log(Math.trunc(false))//0
console.log(Math.trunc(NaN))//NaN
console.log(Math.trunc(undefined))//NaN
console.log(Math.trunc())//NaN
```
### Math.sign()
方法用来判断一个数到底是正数、负数、还是0。对于非数值，会先将其转换为数值。
它会返回五种值。
* 参数为正数，返回+1
* 参数为负数，返回-1
* 参数为0，返回0
* 参数为-0，返回-0
* 其他值，返回NaN
```js
console.log(Math.sign(5)) // 1
console.log(Math.sign(-5)) // -1
console.log(Math.sign(0)) // 0
console.log(Math.sign(NaN)) // NaN
console.log(Math.sign(true)) // 1
console.log(Math.sign(false)) // 0
```
### Math.cbrt()
方法用于计算一个数的立方根
```js
console.log(Math.cbrt(8))//2
```