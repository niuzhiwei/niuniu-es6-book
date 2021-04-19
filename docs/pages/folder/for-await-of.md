# for await of
异步迭代器for-await-of:循环等待每个Promise对象变为resolved状态才进入下一步。
我们知道for...of是同步运行的。有时候一些任务集合是异步的，那这种遍历要咋办？
```js
function Gen(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}

async function test(){
    let arr = [Gen(2000),Gen(1000),Gen(3000)]
    for(let item of arr){
        console.log(Date.now(),item.then(console.log))
    }
}

test()
//1618214201158 Promise {<pending>}
// 1618214201159 Promise {<pending>}
// 1618214201159 Promise {<pending>}
//1000
//2000
//3000
```
这里写了几个小任务，分别是1000ms,2000ms,3000ms后任务结束。在上面的遍历过程中可以看到三个任务是同步启动的，然后输出上也不是按任务的执行顺序输出的，这显然不符合要求。

我们可以想到用await，它可以中断程序的执行直到这个Promise对象的状态发生改变:
```js
function Gen(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}

async function test(){
    let arr = [Gen(2000),Gen(1000),Gen(3000)]
    for(let item of arr){
        console.log(Date.now(),await item.then(console.log))
    }
}

test()
//2000
//1618214587953 undefined
//1000
// 1618214589967 undefined
//3000
// 1618214589968 undefined
```
在ES9中也可以用for...await...of语法来操作：
```js
function Gen(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}

async function test(){
    let arr = [Gen(2000),Gen(1000),Gen(3000)]
    for await (let item of arr){
        console.log(Date.now(),item)
    }
}

test()
// 1618215172772 2000
// 1618215172772 1000
// 1618215173766 3000
```
第二种写法是代码块有await导致等待Promise的状态而不再继续执行；第三种写法是整个代码块都不执行，等待arr当前的值发生变化之后，才执行代码块的内容。

之前我们给数据结构自定义遍历器是同步的，如果想定义适合for..await..of的异步遍历器，答案是Symbol.asyncIterator
```js
let obj = {
    count:0,
    Gen(time){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({done:false,value:time})
            },time)
        })
    },
    [Symbol.asyncIterator](){
        let self = this
        return {
            next(){
                self.count++
                if(self.count<4){
                    return self.Gen(Math.random()*1000)
                }else{
                    return Promise.resolve({
                        done:true,
                        value:''
                    })
                }
            }
        }
    }
}

async function test(){
    for await (let item of obj){
        console.log(Date.now(),item)
    }
}

test()
//1618215880086 790.5298583592273
//1618215880522 435.36427766662354
//1618215881262 725.0567807516439
//1618215881262 725.0567807516439
```