# Object
## 属性简洁表示法
在ES6之前Object的属性必须是key-value形式，在ES6之后可以简写：
```js
let name = 'niuniu'
let obj = {
    name,
    study(){
        console.log(this.name)
    }
}
```
## 属性名表达式
在ES6可以用变量或者表达式来定义Object的key
```js
let n = 'name'
let obj = {
    age:28,
    [n]:'niuniu'
}
```
## Object.is()
```js
let obj1 = {
    name:'niuniu',
    age:28
}
let obj2 = {
    name:'niuniu',
    age:28
}
console.log(obj1==obj2) //false
console.log(Object.is(obj1,obj2)) //false
let obj2 = obj1
console.log(Object.is(obj1,obj2)) //true
```
## Object.assign()
Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，它将返回目标对象
```js
const target = {
    a:1,b:2
}
const source = {
    b:4,c:5
}
const returnedTarget = Object.assign(target,source)
console.log(target) //{a: 1, b: 4, c: 5}
console.log(returnedTarget) //{a: 1, b: 4, c: 5}
```

基本语法```Object.assign(target,...sources)```
| 参数    | 含义     | 必选 |
| ------- | -------- | ---- |
| target  | 目标对象 | Y    |
| sources | 源对象   | Ｎ   |
::: tip
从语法上看，源对象是不限个数的，如果是０个的话，直接返回目标对象，如果是多个相同属性的，会被后面的源对象的属性覆盖
:::
:thinking:如果对象属性具有多层嵌套，这时使用Object.assign()合并对象会怎样呢
```js
let target = {
    a:{
        b:{
            c:1
        },
        e:4,
        f:5,
        g:6
    }
}
let source = {
    a:{
        b:{
            c:1
        },
        e:2,
        f:3
    }
}
Object.assign(target,source)
console.log(target) //属性g消失了...
```
::: warning
Object.assign()对于引用数据类型属于浅拷贝
:::
## 对象的遍历方式
* #### for...in（遍历对象自身和继承的可枚举属性）
* #### Object.keys()用于返回对象所有key组成的数组（不含继承的）
* #### Object.getOwnPropertyNames()用于返回对象所有key组成的数组
* #### Reflect.ownKeys()用于返回对象所有key组成的数组