# Set
在JS里通常使用Array或Object来存储数据。但是在频繁操作数据的过程中查找或统计需要手动来实现，并不能简单的直接使用。比如如何保证Array是去重的，如何统计Object的数据总数等，必须手动实现。在ES6中为了解决上述问题，新增了数据结构Set和Map,它们分别对应传统数据结构的“集合”和“字典”。
ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的。没有重复的值。
## 基本语法
### 生成Set实例
```js
let s = new Set()
let s = new Set([1,2,3,4])
```
::: warning
初始化的参数必须是可遍历的，可以是数组或者自定义遍历的数据结构。
:::

### 添加数据
```js
s.add('hello')
s.add('byebye')

s.add('hello').add('byebye')
```
::: warning
Set数据结构不允许数据重复，所以添加重复的数据是无效的。
:::
### 删除数据
```js
//删除指定数据
s.delete('hello') //true

//删除全部数据
s.clear()
```
### 统计数据
Set 可以快速进行数据统计，如数据是否存在、数据的总数
```js
//判断是否包含数据项，返回true或者false
s.has('hello') //true

//计算数据项总数
s.size //2
```
### 数组去重
```js
const arr = [1,2,2,3,4]
const s = new Set(arr)
console.log(s) //Set(4) {1, 2, 3, 4}
```
### 合并去重
```js
let arr1= [1,2,3,4]
let arr2= [2,3,4,5,6]
let s = new Set([...arr1,...arr2])
console.log(s)//Set(6) {1, 2, 3, 4, 5, 6}
console.log([...s]) // [1, 2, 3, 4, 5, 6]
console.log(Array.from(s)) // [1, 2, 3, 4, 5, 6]
```
### 交集
```js
let arr1= [1,2,3,4]
let arr2= [2,3,4,5,6]
let s1 = new Set(arr1)
let s2 = new Set(arr2)
let result = new Set(arr1.filter(item=>s2.has(item)))
console.log(Array.from(result)) //[2, 3, 4]
```
### 差集
```js
let arr1= [1,2,3,4]
let arr2= [2,3,4,5,6]
let s1 = new Set(arr1)
let s2 = new Set(arr2)
let arr3 = new Set(arr1.filter(item=>!s2.has(item)))
let arr4 = new Set(arr2.filter(item=>!s1.has(item)))
console.log([...arr3,...arr4]) // [1, 5, 6]
```
## 遍历方式
* keys():返回键名的遍历器
* values():返回键值的遍历器
* entries():返回键值对的遍历器
* forEach():使用回调函数遍历每个成员
* for...of：可以直接遍历每个成员

```js
const s = new Set(['hello','bye'])
console.log(s.keys()) //SetIterator {"hello", "bye"}
console.log(s.values()) //SetIterator {"hello", "bye"}
console.log(s.entries()) //SetIterator {"hello" => "hello", "bye" => "bye"}

s.forEach(item=>{
    console.log(item) //hello bye
})

for(let item of s){
    console.log(item) //hello bye
}
```
## WeakSet
WeakSet结构与Set类似，也是不重复的值的集合。但是它与Set有两个区别。
* WeakSet的成员只能是对象，而不能是其他类型的值
```js
const ws = new WeakSet()
ws.add(1) //Uncaught TypeError: Invalid value used in weak set
```
* WeakSet没有size属性，没有办法遍历它的成员
  
```js
const ws = new WeakSet()
const obj1 = {
    name:'niuniu'
}
const obj2 = {
    age:5
}
ws.add(obj1)
ws.add(obj2)
ws.delete(obj1)
console.log(ws)
console.log(ws.has(obj2)) //true
```
WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用。