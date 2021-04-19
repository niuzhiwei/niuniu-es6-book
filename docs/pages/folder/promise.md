# Promise

## 异步操作前置知识
### JS是单线程的
为啥JS是单线程的？因为作为浏览器脚本语言，JS的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程的，否则会很满分。比如JS有俩线程，一个在DOM上添加内容，另一个线程删除了这个DOM，那浏览器该咋办？

单线程意味着，所有的任务都需要排队，前一个任务结束，才能执行后一个任务。如果前一个任务耗时很长，那后一个任务就得一直等，所以JS把所有任务分成两类，同步和异步。

### Ajax原理
Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式、快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax可以是网页实现异步更新。这意味着可以在不重新加载整个网页的情况下对网页的某部分进行更新。
```js
//创建XMLHTTPRequest对象
const url = 'http://jsonplaceholder.typicode.com/users'
let xmlhttp
if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest()
}else{ // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
}

//发送请求
xmlhttp.open('GET',url,true)
xmlhttp.send()

//服务端响应
xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState===4 && xml.status===200){
        let obj = JSON.parse(xmlhttp.responseText)
        console.log(obj)
    }
}
```
### Callback Hell
JS中许多操作都是异步的，我们把上面的Ajax封装成一个函数：
```js
function ajax(url,callback){
    let xmlhttp
    if(window.XMLHttpRequest){
       xmlhttp = new XMLHttpRequest()
    }else{ // code for IE6, IE5
       xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }

    //发送请求
    xmlhttp.open('GET',url,true)
    xmlhttp.send()
    //服务端响应
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState===4 && xmlhttp.status===200){
            let obj = JSON.parse(xmlhttp.responseText)
            callback(obj)
        }
    }
}
```
我们在项目中static文件夹下放三个json文件：
a.json:
```js
{
    "a":"我是A"
}
```

b.json:
```js
{
    "b":"我是B"
}
```

c.json:
```js
{
    "c":"我是C"
}
```
```js
ajax('static/a.json',res=>{
    console.log(res)
    ajax('static/b.json',res=>{
        console.log(res)
        ajax('static/c.json',res=>{
            console.log(res)
        })
    })
})
```
如果嵌套变多，代码层次就会变深，维护难度也会随之增加，这就是回调地狱。

## 基本语法
Promise就是为了解决回调地狱问题的，它可以将异步操作变得很优雅。
创建Promise实例
```js
const promise = new Promise((resolve,reject)=>{
    //...
    if(异步操作成功){
        resolve(value)
    }else{
        reject(error)
    }
})
```
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
* 处理结果正常的话，调用resolve(处理结果值)，将Promise对象的状态从”未完成“变为”成功“（即从pending变成resolved)，在异步操作成功时调用，并将异步操作的结果。作为参数传递出去。
* 处理结果错误的话，调用reject(Error对象)，将Promise对象的状态从”未完成“变成”失败”（即从pending变为rejected),在异步操作势必时，调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数
```js
promise.then((value)=>{
    //success
},(error)=>{
   //failure
})
```
Promise内部是有状态的(pending,fulfilled,rejected),Promise对象根据状态来确定执行哪个方法。Promise在实例化的时候状态默认是pending的，当异步操作完成，状态会被修改为fulfilled，如果异步操作遇到异常，状态会被修改为rejected。

## Promise.prototype.then()
基本语法 ```promise.then(onFulfilled,onRejected)```

示例
```js
var promise = new Promise((resolve,reject)=>{
    resolve('传递给then的值')
})

promise.then((value)=>{
    console.log(value)
},(error)=>{
 console.err(error)
})
```
## Promise.prototype.catch()
捕获异常是程序质量保证最基本的要求，可以使用Promise对象的catch方法来捕获异常操作过程中出现的任何异常。
示例
```js
function test(){
    return new Promise((resolve,reject)=>{
        reject(new Error('es'))
    })
}

test().catch(e=>{
    console.log(e.message)//es
})
```
这个代码展示了如何使用catch捕获Promise对象中的异常，那catch捕获的是Primise内部的Error还是Reject?
```js
function test(){
    return new Promise((resolve,reject)=>{
        throw new Error('wrong')
    })
}

test().catch(e=>{
    console.log(e.message) //wrong
})
```
两段代码对比，可以看出来，throw Error和rejct都触发了catch的捕获。
## Promise.resolve()
一般情况下我们都会使用```new Promise```来创建Promise对象，但是初次之外我们也可以使用其他的方法。
静态方法Promise.resolve(value)可以认为是new Promise()方法的快捷方式。

比如Promise.resolve(42)可以认为是以下代码的语法糖。
```js
new Promise((resolve)=>{
    resolve(42)
})
```
在这段代码中的resolve(42)会让这个Promise对象击立即进入确定状态，并将42传递给后面的then里面所指定的函数。

方法Promise.resolve(value)的返回值也是一个Promise对象，所以我们可以像下面那样接着对其返回值进行.then调用。
```js
Promise.resolve(42).then((val)=>{
    console.log(42)
})
```
## Promise.reject()
Promise.reject(error)是和Promise.resolve(value)类似的静态方法，是new Promise()方法的快捷方式。
比如Promise.reject(new Error('出错了'))就是下面代码的语法糖形式。
```js
new Promise((resolve,reject)=>{
    reject(new Error('出错了'))
})
```
## Promise.all()
基本语法 ```Promise.all(promiseArray)```
示例
```js
var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = Promise.resolve(3)
Promise.all([p1,p2,p3]).then(results=>{
    console.log(results) //[1, 2, 3]
})
```
Promise.all生成并返回一个新的Promise对象，所以它可以使用Promise实例的所有方法。参数传递promise数组中所有的Promise对象都变为resolve的时候，该方法才会返回，新创建的Promise则会使用这些promise的值。

如果参数中的任何一个promise为reject的话，则整个Promise.all调用就会立即停止，并返回一个reject的新的Promise对象。

## Promise.race()
基本语法```Promise.race(promiseArray)```

示例
```js
var p1 = Promise.resolve(1)
var p2 = Promise.resolve(2)
var p3 = Promise.resolve(3)
Promise.race([p1,p2,p3]).then(results=>{
    console.log(results) //[1, 2, 3]
})//1
```
Promise.race生成并返回一个新的Promise对象。
参数promise数组中的任何一个Promise对象如果变成resolve或者reject的话，该函数就会返回，并使用这个Promise对象的值进行resolve或者reject。

如何把前面的callback hell的代码改成Promise写法
```js
function getPromise(url){
    return new Promise((resolve,reject)=>{
        ajax(url,res=>{
            resolve(res)
        },,err=>{
        reject(err)
    })
    })
}

getPromise('static/a.json').then(res=>{
    console.log(res)
    return getPromise('static/b.json')
}).then(res=>{
    console.log(res)
    return getPromise('static/c.json')
}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
```