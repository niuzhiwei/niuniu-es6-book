# String扩展
## 遍历器接口
ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历
```js
for(let item in 'cheng'){
    console.log(item) // 0 1 2 3 4
}
```
## 模板字符串
这个太熟悉啦！

## 扩展方法
### String.prototype.includes()
```js
const str = 'xiaopi'
console.log(str.includes('pi'))//true
```
### String.prototype.startsWith()
判断参数字符串是否在原字符串的头部，返回boolean类型的值。
```js
const str = 'xiaopi'
console.log(str.startsWith('xi'))//true
```
### String.prototype.endsWith()
```js
const str = 'xiaopi'
console.log(str.endsWith('pi'))//true
```
### String.prototype.repeat()
```js
const str = 'niu'
const newStr = str.repeat(10)
console.log(newStr)//niuniuniuniuniuniuniuniuniuniu
```