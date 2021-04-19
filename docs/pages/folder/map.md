# Map
ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但“键”的范围不限于字符串，各种类型的值（包括对象)都可以当作键。也就是说，Object结构提供了“字符串-值”的对应，Map结构提供了“值-值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。
## 基本语法
### 实例化
```js
const map = new Map([iterable])
```
Iterable可以是一个数组或其他的Iterable对象，其元素为键值对（两个元素的数组，例如[[1,'one'],[2,'two']])。每个键值对都会添加到新的Map。null会被当作undefined。
### 添加数据
```js
let keyObj = {}
let keyFunc = function(){}
let keyString = 'string'
//添加键
map.set(keyObj,'和键keyObj关联的值')
map.set(keyFunc,'和键keyFunc关联的值')
map.set(keyString,'和键keyString关联的值')
```
### 删除数据
```js
//删除指定的数据
map.delete(keyObj)
//删除所有数据
map.clear()
```
### 统计数据
```js
//统计所有key-value的总数
console.log(map.size) //2
//判断是否有Key-value
console.log(map.has(keyObj)) //true
```
### 查询数据
get()方法返回某个Map对象中一个指定元素
```js
console.log(map.get(keyObj)) //和键keyObj关联的值
```
## 遍历方式
* keys()返回一个新的Iterator对象，它包含按照顺序插入Map对象中每个元素的key值
* values()返回一个新的Iterator对象，它包含按照顺序插入Map对象中每个元素的value值
* entries()方法返回一个新的包含[key,value]对的Iterator对象，返回的迭代器顺序与Map对象的插入顺序相同
* forEach() 方法将会以插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数
* for...of 可以直接遍历每个成员
```js
 map.forEach((value, key) => console.log(value, key))

   for (let [key, value] of map) {
       console.log(key, value)
   }

   for (let key of map.keys()) {
       console.log(key)
   }

   for (let value of map.values()) {
       console.log(value)
   }

   for (let [key, value] of map.entries()) {
       console.log(key, value)
   }
```
## Object与Map的区别
* #### 键的类型
一个Ojbect的键只能是字符串或者Symbols，但Map的键可以是任意值
* #### 键的顺序
Map中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历是，Map对象是按插入的顺序返回键值。
* #### 键值对的统计
可以通过size属性直接获取一个Map的键值对个数，而Object只能手动计算。
* #### 键值对的遍历
Map可直接进行迭代，而Object的迭代需要先获取它的键数组，然后再进行迭代。
* #### 性能
Map在涉及频繁增删键值对的场景下会有些性能优势。
## WeakMap
WeakMap结构与Map结构类似，也是用于生成键值对的集合。
```js
//WeakMap可以使用set方法添加成员
const wm1 = new WeakMap()
const key = {
    foo:1
}
wm1.set(key,2)
wm1.get(key) //2

//WeakMap也可以接受一个数组，作为构造函数的参数
const k1 = [1,2,3]
const k2 = [4,5,6]
const wm2 = new WeakMap([
    [k1,'foo'],
    [k2,'bar']
])
wm2.get(k2) //bar
```
WeakMap与Map的区别有两点。
* WeakMap只接受对象作为键名(null除外),不接受其他类型的值作为键名。
* WeakMap的键名所指向的对象，不计入垃圾回收机制