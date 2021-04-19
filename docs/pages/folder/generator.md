# Generator
通俗的讲Generator是可以用来控制迭代器的函数。
1. #### 常规循环
```js
for(let i=0;i<5;i+=1){
    console.log(i)
}
```
2. #### Generator
```js
function* generatorForLoop(){
    for(let i = 0;i<5;i++){
        yield console.log(i)
    }
}

const genForLoop = generatorForLoop()

console.log(genForLoop.next()) //0 {value: undefined, done: false}
console.log(genForLoop.next()) //1 {value: undefined, done: false}
console.log(genForLoop.next()) //2 {value: undefined, done: false}
console.log(genForLoop.next()) //3 {value: undefined, done: false}
console.log(genForLoop.next()) //4 {value: undefined, done: false}
console.log(genForLoop.next()) //{value: undefined, done: true}
```
对比上面两段代码，常规的循环只能一次遍历完所有值，Generator可以通过调用next方法拿到一次遍历的值，让遍历的执行变得"可控"。

## 基本语法
### 定义
```js
function* gen(){
    yield 1
    yield 2
    yield 3
}
let g = gen()
```
这个是Generator的定义方法，有几个点值得注意：
1. 比普通函数多一个 *
2. 函数内部用yield来控制程序的执行的"暂停"
3. 函数的返回值通过调用next来"恢复"程序执行

::: danger
Generator函数的定义不能使用箭头函数，会报错
:::
### yield表达式
```yield关键字用来暂停和恢复一个生成器函数```
关于yield表达式，有以下几个知识点:
1. yield表达式的返回值是undefined,但是遍历器对象的next方法可以修改这个默认值。
```js
function * gen(){
    let val 
    val = yield 1
    console.log(val) //undefined
    val = yield 2
    console.log(val) //undefined
    val = yield 3
    console.log(val) //undefined
}
var g = gen()

console.log(g.next()) //{value: 1, done: false}
console.log(g.next()) //{value: 2, done: false}
console.log(g.next()) //{value: 3, done: false}
console.log(g.next()) //{value: undefined, done: true}
```
从上面代码可以看出，yield表达式的返回值是undefined。

2. yield* 是委托给另一个遍历器对象或者可遍历对象
3. Generator对象的next方法，遇到yield就暂停，并返回一个对象，这个对象包含两个属性:value和done。

### 方法
Generator对象有几个方法,next,return,throw

* #### next([value])
上面说了,Generator对象通过next方法来获取每一次遍历的结果，这个方法返回一个对象，这个对象包含两个属性：value和done。value是指当前程序的运行结果;done表示遍历是否结束。

其实next可以接受参数的，这个参数可以让你在Generator外部给内部传递数据，而这个参数就是作为yield的返回值。
```js
function* gen(){
    var val = 100
    while(true){
        console.log(`before ${val}`)
        val = yield val
        console.log(`return ${val}`)
    }
}

var g = gen()
console.log(g.next(20).value)
//before 100
//100
console.log(g.next(30).value)
  // return 30
  // before 30
  // 30
console.log(g.next(40).vaule)
  // return 40
  // before 40
  // 40
```
上面的代码有点难理解，现在来还原一下这段代码的执行过程:
1. g.next(20)这句代码会执行内部的代码，遇到第一个yield暂停。所以``` console.log(`before ${val}`)```执行输出了```before 100```,此时的val是100，所以执行到yield val返回了100，注意```yield val```并没有赋值给val。
2. ```g.next(30)```这句代码会继续执行gen内部的代码，也就是```val = yield val```这句，因为next传入了30，所有yield val 这个返回值就是30，因此val被赋值30，执行到```console.log(`return ${val}`)```输出了30，此时没有遇到yield代码继续执行，也就是while的判断，继续执行``` console.log(`before ${val}`)```输出了```before 30```,再执行遇到了```yield val```程序暂停。
3. g.next(40)重复步骤2

* #### return
return方法可以让Generator遍历终止，有点类似for循环的break。
```js
function* gen(){
    yield 1
    yield 2
    yield 3
}

var g = gen()

console.log(g.next()) //{value: 1, done: false}
console.log(g.return()) //{value: undefined, done: true}
console.log(g.next()) //{value: undefined, done: true}
```
从done可以看出代码执行已经结束。

当然return也可以传入参数，作为返回的value值。
```js
function* gen() {
    yield 1
    yield 2
    yield 3
}

var g = gen()

console.log(g.next()) // {value: 1, done: false}
console.log(g.return(100)) // {value: 100, done: true}
console.log(g.next()) // {value: undefined, done: true}
```

* #### throw()
* 可以通过throw方法在Generator外部控制内部执行的"终断"
```js
function* gen(){
    while(true){
        try{
            yield 42
        }catch(e){
            console.log(e.message)
        }
    }
}

let g = gen()
console.log(g.next()) //{value: 42, done: false}
console.log(g.next())//{value: 42, done: false}
console.log(g.next())//{value: 42, done: false}

//终端操作
g.throw(new Error('break'))

console.log(g.return(false)) //{value: undefined, done: true}
```

## 应用场景
### 场景1
Promise一节中的异步操作，按顺序读取a.json,b.json,c.json，用Generator该如何实现呢？
```js
function request(url){
    ajax(url,res=>{
     genData.next(res)
    })
}

function* gen(){
    let res1 = yield request('static/a.json')
    console.log(res1)
    let res2 = yield request('static/b.json')
    console.log(res2)
    let res3 = yield request('static/c.json')
    console.log(res3)
}
let genData = gen()
getData.next()
```

### 场景2
比如敲7游戏，输出7和7的倍数
```js
function* count(x=1){
    while(true){
        if(x%7 === 0){
            yield x
        }
        x++
    }
}
let n = count()
console.log(n.next().value) //7
console.log(n.next().value) //14
console.log(n.next().value) //21
```