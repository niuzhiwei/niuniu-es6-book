# Promise.prototype.finally()
指定不管最后状态如何都会执行的回调函数。

Promise.prototype.finally()方法返回一个Promise,在promise执行结束时，无论结果是fulfilled或者是rejected，在执行then()和catch()后，都会执行finally指定的回调函数。

这位指定执行完promise后，无论结果是fulfilled还是rejected都需要执行的代码提供了一种方式，避免同样的语句需要在then()和catch()中各写一次的情况。

#### 基本语法
```p.finally(onFinally)```

示例
```js
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('success')
    },1000)
}).then(res=>{
    console.log(res) //success
}).catch(err=>{
    console.log(err)
}).finally(()=>{
    console.log('finally') //finally
})
```
### 场景1：loading关闭
需要每次发送请求，都会有loading提示，请求发送完毕，就需要关闭loading提示框，无论请求成功还是失败，都要把loading关闭，这是把关闭loading的代码写在finally最合适。