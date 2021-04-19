# Array.prototype.includes()
在ES7之前想判断数组中是否包含一个元素，可以这样写：
```js
console.log(arr.find(item=> item ===3))
```
或者
```js
console.log(arr.filter(item=> item===3).length>0)
```
ES7中引入Array.prototype.includes()方法来判断一个数组是否包含某个指定的值，返回Boolean。
### 基本用法
```js
const arr = ['one','two','three']
console.log(arr.includes('one')) //true
```
### 接受两个参数
要搜索的值和搜索的开始索引。第二个参数可选。
```js
const arr = ['one','two','three']
console.log(arr.includes('two',1))//true
console.log(arr.includes('two',2))//false
console.log(arr.includes('two',-1))//false
console.log(arr.includes('two',-2)) //true
```
### 与indexOf()比较
两者都是采用===的操作符来比较的，不同之处在于：对于NaN的处理结果不同。
```js
const arr = [1,NaN,2,3]
arr.indexOf(NaN) //-1
arr.includes(NaN) //true
```