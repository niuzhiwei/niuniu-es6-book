# async/await

async和await是一种更加优雅的异步编程解决方案，是Promise的拓展。
在处理异步的时候，比起回调函数，Promise的then方法会显得较为简洁和清晰，但是在处理多个彼此之间相互依赖的请求的时候，就会显得有些繁琐。这时候，用async/await更加优雅。
## 基本语法
```js
async function foo(){
    return 'test' //Promise.resolve('test')
}
console.log(foo()) //Promise {<fulfilled>: "test"}
foo()
```
await后面需要跟异步操作，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数。
```js
function timeout(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(1)
            resolve()
        },1000)
    })
}
//不加aysnc和await是2，1,加了是1，2
async function foo(){
    await timeout()
    console.log(2)
}
foo()
```
### 对于失败的处理
```js
function timeout(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('error')
        },1000)
    })
}
async function foo(){
    return await timeout()
}
foo().then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})//error
```
在async函数中使用await，那么await这里的代码就会变成同步的了，意思就是说只有等await后面的Promise执行完成得到结果才会继续下去，await就是等待。

## 应用
还是Promise中的异步案例，我们需要发送多个请求，而后面请求的发送总是需要依赖上一个请求返回的数据。对于这个问题，我们可以用Promise的链式调用，也可以用async/await来解决。
```js
//把ajax封装成模块
import ajax from './ajax'

function request(url){
    return new Promise(resolve=>{
        ajax(url,res=>{
            resolve(res)
        })
    })
}

async function getData(){
    let res1 = await request('static/a.json')
    console.log(res1)
    let res2 = await request('static/b.json')
    console.log(res2)
    let res3 = await request('static/c.json')
    console.log(res3)
}
getData()

```