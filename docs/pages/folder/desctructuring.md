# 解构赋值
ES6中新增的变量赋值方式-解构赋值。简单看下例子：
```js
let [a,b,c] = [1,2,3]
console.log(a) //1
console.log(b) //2
console.log(c) //3
```
## 数组解构赋值
* #### 赋值元素可以是任意可遍历的对象
```js
let [a,b,c]= 'abc' // ['a','b','c']
let [d,e,f] = new Set([1,2,3])
```
* #### 左边的变量
被赋值的变量还可以是对象的属性，不局限于单纯的变量
``` js
let user = {}
[user.firstName,user.lastName] = 'niu zhiwei'.split(' ')
console.log(user.firstName,user.lastName) //niu zhiwei
```
* #### 循环体
解构赋值在循环体中的应用，配合entries使用
``` js
let user = {
    name:'niuniu',
    age:28
}
for(let [key,value] of Object.entries(user)){
    console.log(`${key}:${value}`)
} //name:niuniu age:28
```
* ####可以跳过赋值元素
如果想跳过赋值，可以用逗号来处理
``` js
let [name,,weather] =['niuniu','white','rain']
console.log(weather) //rain
```
* #### rest参数
```js
let [one,two,...rest] = ['apple','orange','peach','banana']
console.log(one) //apple
console.log(rest) //["peach", "banana"]
console.log(rest.length) //2
```
::: warning
可以使用rest来接受赋值数组的剩余元素，不过rest参数必须放在被赋值变量的最后一个位置上。
:::
* #### 默认值
如果数组的内容少于变量的个数，并不会报错，变量会变成undefined
``` js
let [one,two] = []
console.log(one) //undefined
console.log(two) //undefined
```
可以给变量先赋值默认值，防止上面赋值undefined的情况：
``` js
let [name='xixi',age=30] = ['niuniu']
console.log(name) //xixi
console.log(age) //30
```
## 对象解构赋值
* #### 基本使用
``` js
let user = {
    name:'niuniu',
    age:28,
    address:'earth'
}
let {name,age,address} = user
console.log(name) //niuniu
console.log(age) //28
console.log(address) //earth
```
::: tip
对象结构赋值中，左侧的结构要和右侧对象的结构一致，顺序无需一致。
:::
* #### 默认值
``` js
let user = {
    address:'earth'
}
let {name='niuniu',age=28,address} = user
console.log(name) //niuniu
console.log(age) //28
console.log(address) //earth
```
* #### rest运算符
``` js
let user = {
    name:'niuniu',
    age:28,
    address:'earth'
}
let {name='niuniu',...rest} = user
console.log(name) //niuniu
console.log(rest) //{age: 28, address: "earth"}
```
* #### 嵌套对象
如果一个数组或者对象比较复杂，它嵌套了数组或者对象，那只要被赋值的结构和右侧赋值的元素一致就可以。
``` js
let user = {
    name:'niuniu',
    age:28,
    info:{
        address:'earth'
    },
    items:['cat','dog']
}
let {name,age,info:{address},items:[item1,item2]} = user
console.log(name) //niuniu
console.log(age) //28
console.log(address) //earth
console.log(item1) //cat
console.log(item2) //dog
```
## 字符串解构赋值
和数组解构赋值差不多：
```js
let str = 'xiaopi'
let [a,b,c,d,e,f] = str
console.log(a,b,c,d,e,f) //x i a o p i
```