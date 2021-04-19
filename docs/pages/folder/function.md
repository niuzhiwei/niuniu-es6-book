# Function
## 默认参数
ES6中函数默认参数写法：
```js
function foo(x,y='world'){
    console.log(x,y)
}
foo('hello') //hello world
```
如果我们想让具体某个参数使用默认值，可以使用undefined进行赋值：
``` js
function f(x,y=7,z=42){
    return x+y+z
}
console.log(f(1,undefined,43)) //51
```
### 拓展
在函数体内，需要判断函数有几个参数，在ES5中：
```js
function foo(a,b=1,c){
    console.log(arguments.length)
}
foo('a','b') //2
```
在ES6中：
```js
function foo(a,b=1,c){
    console.log(foo.length)
}
foo('a','b') //1
```

:stuck_out_tongue:看完上述代码发现，function.length结果和arguments的结果不同啊！因为function.length是统计第一个默认参数前面的变量数！

## Rest参数
在写函数的时候，有时候我们不清楚函数有多少个，比如一个求和函数，之前的做法是:
```js
function sum(){
    let num = 0;
    Array.prototype.forEach.call(arguments,(item)=>num+=item*1)
    return num
}
console.log(sum(1,2,3)) //6
```
在ES6中：
```js
function sum(...nums){
    let num = 0;
    nums.forEach((item)=>num+=item*1)
    return num
}
console.log(sum(1,2,3)) //6
```
::: warning
arguments 不是数组，所以不能直接使用数组的原生 API 如 forEach，而 Rest Parameter 是数组，可以直接使用数组的原生 API。
:::

## 扩展运算符
Spread Operator 和 Rest Parameter是形相似但是意义相反的操作符。
```js
function sum(x=1,y=2,z=3){
    return x+y+z
}
console.log(sum(...[4,5])) ///12
```
如果没有扩展运算符，可能需要这样做：
```js
function sum(x=1,y=2,z=3){
    return x+y+z
}
console.log(sum.apply(null,[4,5,6])) //15
```
## length属性
函数制订了默认值以后，函数的length属性，将范围没有指定默认值的参数个数。
```js
function foo(x=1,y=2,z=3){
    console.log(x)
}
console.log(foo.length) //0
```
## name属性
函数的name属性，返回该函数的函数名。
```js
function foo(){}
foo.name //foo
```
## 箭头函数
:joy:箭头函数已经很熟悉啦就不详细写了！
### 拓展
箭头函数和普通函数的对this的处理方式不同哦！
```js
let foo = {
    name:'es6',
    say:function(){
        console.log(this.name)
    }
}
console.log(foo.say())//es6
```
上面是普通函数的写法，say在被调用之后，this指向是调用say方法的对象，也就是foo对象，所以this.name为foo.name
```js
let foo = {
    name:'es6',
    say:()=>{
        console.log(this.name)
    }
}
console.log(foo.say())//undefined
```
因为箭头函数中对this的处理是定义时，this的指向也就是foo外层所指向的window,而window没有name属性，所以结果是undefined。
::: tip
1. 箭头函数中的this指向定义时所在的对象，而不是调用时所在的对象。
2. 箭头函数不可以当作构造函数
3. 箭头函数不可以使用arguments对象
:::