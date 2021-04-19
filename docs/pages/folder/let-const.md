## 作用域

### 什么是作用域？
作用域产生于程序源代码中定义变量的区域，在程序编码阶段就确定了。javascript 中分为全局作用域(Global context： window/global )和局部作用域（Local Scope , 又称为函数作用域 Function context）。简单讲作用域就是当前函数的生成环境或者上下文，包含了当前函数内定义的变量以及对外层作用域的引用。

| 对象          | 类型       |
| ------------- | ---------- |
| global/window | 全局作用域 |
| function      | 函数作用域 |
| {}            | 块级作用域 |
| this          | 动态作用域 |

::: tip
如果一个变量如果不在“当前的作用域”,那么JS机制会沿着作用域链向上查找直到全局作用域，如果找不到将不可被使用。
:::

#### 全局作用域
变量在函数或者代码块外定义，即为全局作用域。
``` js
var name = 'niuniu'
//此处可调用name变量
function xxx(){
    //函数内可调用name变量
}
```

如果变量在函数内没有声明（没有使用var关键字），该变量依然为全局变量。

#### 函数作用域
``` js
function bar(){
    var test = 'inner'
}
console.log(test) //Uncaught ReferenceError: test is not defined
```
如果想读入函数内的变量，可借助return或者闭包。
``` js
function bar(val){
    var test ='inner'
    return test+val
}
console.log(bar('niuniu')) //innerniuniu
```
上面是return的方式，下面是闭包的方式：
```js
function bar(val){
    var test = 'inner'
    var result = test+val
    function inner(){
        return result
    }
    return inner()
}
console.log(bar('niu')) // "innerniu"
```
#### 块状作用域
在ES6之前，JS除了全局作用域就是函数作用域，一直没有块级作用域。在ES6中，{}就代表快。
``` js
if(true){
    let a = 1;
    console.log(a)
}
```
在上面代码中，if后{}就是块，{}外是无法访问变量a的。
#### 动态作用域
``` js
window.a = 3
function test(){
    console.log(this.a)
}
test.bind({a:2})() //2
test() //3
```
上述代码bind已经把作用域范围进行修改指向了```{a:2}```，而this指向的是当前作用域对象。
::: tip
变量的作用域是在定义时决定而不是执行时决定。相反，只能在执行阶段才能决定的变量作用域，就是动态作用域。
:::

## Let
#### 1.let声明的全局变量不是全局对象window的属性
```js
var a=5;
console.log(window.a)//5
```
```js
let a=5;
console.log(window.a)//undefined
```
#### 2.用let定义变量不允许重复声明
#### 3.let声明的变量不存在变量提升
``` js
function foo(){
    console.log(a)
    var a = 1;
}
foo() //undefined
```
上述代码中，a的调用在声明之前，因为var声明的变量会导致变量提升，所以值为undefined而不是报错。
``` js
function foo(){
    console.log(a)
    let a = 5;
}
foo() //Uncaught ReferenceError: Cannot access 'a' before initialization
```
#### 4.let声明的变量具有暂时性死区
只要块级作用域存在let,他所声明的变量就绑定在这个区域，不受外部影响。
``` js
var a = 5;
if(true){
    a = 6;
    let a ;
}// Uncaught ReferenceError: Cannot access 'a' before initialization
```
ES6明确规定，如果块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前使用这些变量，就会报错。这在语法上，称为“暂时性死区”

隐蔽的“暂时性死区”
``` js
function foo(b=a,a=2){
    console.log(a,b)
}
foo() //Uncaught ReferenceError: Cannot access 'a' before initialization
```
#### 5.let声明的变量拥有块级作用域
``` js
for(var i=0;i<3;i++){
    setTimeout(function(){
        console.log(i)
    })
}
```
输出是3次3，如果希望值是0,1,2，方法有：
- 1.闭包
``` js
for(var i = 0;i<3;i++){
    (function(j){
        setTimeout(function(){
            console.log(j)
        })
    })(i)
}
```
- 2.使用let
``` js
for(let i=0;i<3;i++){
    setTimeout(function(){
        console.log(i)
    })
}
```
把代码经过babel转换后：<https://www.babeljs.cn/repl>
``` js
"use strict";

var _loop = function _loop(i) {
  setTimeout(function () {
    console.log(i);
  });
};

for (var i = 0; i < 3; i++) {
  _loop(i);
}
```
其实babel把这段代码转换成了闭包的形式
## Const
不能被改变的叫做常量
在ES5中，可以使用Object.defineProperty()来实现定义常量：
``` js
Object.defineProperty(window,'PI',{
  value:3.14,
  writable:false
})
console.log(PI) //3.14
PI=100
console.log(PI) //3.14
```
const 和let一样，具有块级作用域，不会变量提升以外，他定义的是常量，在用const定义后，我们就不能修改他了，对变量修改会抛出异常。
因为const定义的变量是不能被修改的，所以它一定要进行初始化。
::: warning
const 声明的变量必须进行初始化，不然会抛出异常 Uncaught SyntaxError: Missing initializer in const declaration。
:::

#### 重点！重点！:tada:
``` js
const obj = {
    name:'niuniu',
    age:34
}
obj.school = 'wuhan'
console.log(obj) //name: "niuniu", age: 34, school: "wuhan"}
```
上述代码，用const定义的obj居然可以被改变，这和上面说的矛盾啊！
这需要从JS中的变量存储来看：
<img :src="$withBase('/stack-heap.jpg')" alt="mixureSecure">

基本数据类型存储在栈内存中，引用数据类型存储在堆内存中，然后在栈内存中保存引用地址。

如何让对象或者数组这种引用数据类型也不被改变呢？
``` js
Object.freeze(obj)
```
::: warning
Object.freeze()是浅层冻结，只会冻结最近一层的对象，并不会对深层对象冻结。
:::