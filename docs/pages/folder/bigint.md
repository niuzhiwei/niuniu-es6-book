# BigInt
在ES10新增了原始数据类型：BigInt，表示一个任意精度的整数，可以表示超长数据，可以超出2的53次方。
JS中Number类型只能安全的表示-(2^53 -1)至2^53-1范围的值。
```js
console.log(2**53) //9007199254740992
console.log(Number.MAX_SAFE_INTEGER)//9007199254740991
```
使用BigInt有两种方式:
#### 方式一：数字后面增加n
```js
const bigInt = 9007199254740993n
console.log(bigInt) //9007199254740993n
console.log(typeof bigInt) //bigint

console.log(1n == 1)//true
console.log(1n===1)//false
```
#### 方法二：使用BigInt函数
```js
const bigIntNum = BigInt(9007199254740993n)
console.log(bigIntNum) //9007199254740993n
```