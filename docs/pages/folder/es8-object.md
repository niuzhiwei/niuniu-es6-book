# Object
之前的语法如何获取对象的每一个属性值
```js
const obj = {
    name:'niuniu',
    age:28,
    address:'earth'
}
console.log(Object.keys(obj)) //["name", "age", "address"]
const res = Object.keys(obj).map(key=>obj[key])
console.log(res) //["niuniu", 28, "earth"]
```
ES8中对象扩展补充了两个静态方法，用于遍历对象：Object.values(),Object.entries()
## Object.values()
```Object.values()返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与手动循环对象的属性值所给出的顺序相同（for...in,但是for...in还会遍历原型上的属性值```
```js
const obj = {
    name:'niuniu',
    age:28,
    address:'earth'
}
console.log(Object.values(obj)) //["niuniu", 28, "earth"]
```
## Object.entries()
```Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用for...in循环遍历该对象时返回的顺序一致。（区别在于for...in循环也枚举原型链中的属性）```
```js
const obj = {
    name:'niuniu',
    age:28,
    address:'earth'
}

for(let [k,v] of Object.entries(obj)){
    console.log(k,v)
}
//name niuniu
//age 28
//address earth
```
## Object.getOwnPropertyDescriptors()
要理解Object.getOwnPropertyDescriptors()这个方法之前，首先要搞懂什么是描述符(descriptor)?
```js
const data = {
    a:1,
    b:2,
    c:3
}
```
上面的对象有key和value，如果我们遍历所有的key,vlaue，但是不想让c这个属性和值被枚举怎么办？
```js
Object.defineProperty(data,'c',{
    enumerable:false
})
Object.entries(data).map(([k,v])=>{
    console.log(k,v)
})
//a 1
//b 2
```
很明显，c没有被遍历出来，那么defineProperty的第三个参数就是描述符。这个描述付包括几个属性:
* value-属性的值
* writable-属性的值是否可被改变
* enumeralbe-属性的值是否可被枚举
* configurable-描述符本身是否可被修改，属性是否可被删除
```js
console.log(Object.getOwnPropertyDescriptor(data,'c'))
//{value: 3, writable: true, enumerable: false, configurable: true}
```