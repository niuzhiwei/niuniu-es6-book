# Proxy
在ES6标准中新增的一个非常强大的功能是Proxy,它可以自定义一些常用行为，如查找，赋值，枚举，函数调用等。
## 基本语法
### 语法 
```js
let p = new Proxy(target,handler)
```
| 参数    | 含义                                                                              | 必选 |
| ------- | --------------------------------------------------------------------------------- | ---- |
| target  | 用proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理） | Y    |
| handler | 一个对象，其属性是当执行一个操作时定义代理的行为的函数                            | Y    |

## 拦截操作场景
我们经常读取一个对象的key-value:
```js
let o = {
    name:'niuniu',
    age:28
}
console.log(o.name) //niuniu
console.log(o.age) //28
console.log(o.from) //undefined
```
读取from属性是返回的是undefined,因为o这个对象没有这个Key-value。如果不想再调用Key的时候返回undefined,之前的做法：
```js
console.log(o.from || '')
```
ES6的Proxy可以轻松的搞定这个事儿：
```js
let o = {
    name:'niuniu',
    age:28
}
let p = new Proxy(o,{
    get(obj,key){
        return Reflect.has(obj,key)?obj[key]:''
    }
})
console.log(p.from)
```
接下来我们描述下“写操作”，从服务端获取的数据希望是只读，不允许在任何环节被修改。
```js
//在ES5中只能通过遍历把所有的属性设置为只读
for(let [key] of Object.entries(response.data)){
    Object.defineProperty(response.data,key,{
        writable:false
    })
}
```
如果使用Proxy就简单多咯：
```js
let data = new Proxy(response.data,{
    set(obj,key,value){
        return false
    }
})
```
再比如数据交互，校验是不可或缺的，传统的做法是将校验写在了业务逻辑中，如果使用Proxy代码就可以比较灵活。
```js
//Validator.js
export default (obj,key,value)=>{
    if(Reflect.has(key) && value>20){
        obj[key] = value
    }
}

import Validator from './Validator'
let data = new Proxy(response.data,{
    set:Validator
})
```
如果对读写进行监控，可以这样写：
```js
let validator = {
    set(target,key,value){
        if(key==='age'){
            if(typeof value !== 'number' || Number.isNaN(value)){
                throw new TypeError('Age must be a number')
            }
            if(value<=0){
                throw new TypeError('Age must be a positive number')
            }
        }
        return true
    }
}
const person = {
    age:28
}
const proxy = new Proxy(person,validator)
proxy.age = 'foo' //Uncaught TypeError: Age must be a number
proxy.age = 0 //Uncaught TypeError: Age must be a positive number

proxy.age = 28
console.log(person.age) //28

//添加监控
window.addEventListener('error',e=>{
    console.log(e.message)
},true)
```
## 常用拦截操作
### get
拦截对象属性的读取，比如proxy.foo或者proxy['foo']
```js
let arr = [7,8,9]
arr = new Proxy(arr,{
    get(target,prop){
        console.log(target,prop)
        return prop in target?target[prop]:'error'
    }
})
console.log(arr[1])//8
console.log(arr[10])//error
```
```js
let dict = {
    'hello':'你好',
    'world':'世界'
}
dict = new Proxy(dict,{
    get(target,prop){
        return prop in target?target[prop]:prop
    }
})
console.log(dict['world']) //世界
console.log(dict['chengzi']) //chengzi
```
### set
拦截对象属性的设置，比如proxy.foo = v 或proxy['foo'] = v,返回一个布尔值
```js
let arr = []
arr = new Proxy(arr,{
    set(target,prop,val){
        console.log(target)
        console.log(prop)
        console.log(val)
        if(typeof val === 'number'){
            target[prop] = val
            return true
        }else{
            return false
        }
    }
})
arr.push(5)
arr.push(6)
console.log(arr[0],arr[1],arr.length)
```
### has
拦截propKey in proxy的操作，返回一个布尔值
```js
let range = {
    start:1,
    end:5
}

range = new Proxy(range,{
    has(target,prop){
        return prop>=target.start && prop <=target.end
    }
})
console.log(2 in range)//true
console.log(9 in range)//false
```
### ownKeys
拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。
该方法返回目标对象所有自身属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
```js
let obj = {
    name:'niuniu',
    [Symbol('es')]:'es6'
}
console.log(Object.getOwnPropertyNames(obj)) //["name"]
console.log(Object.getOwnPropertySymbols(obj))//[Symbol(es)]
console.log(Object.keys(obj)) //["name"]
for(let key in obj){
    console.log(key) //name
}
```
```js
let userinfo = {
    username:'niuniu',
    age:28,
    _password:'***'
}
userinfo = new Proxy(userinfo,{
    ownKeys(target){
        return Object.keys(target).filter(key=> !key.startsWith('_'))
    }
})

console.log(Object.keys(userinfo)) //["username", "age"]
```
### deleteProperty
拦截delete proxy[propKey]的操作，返回一个布尔值
```js
let userinfo = {
    username:'niuniu',
    age:28,
    _password:'***'
}

userinfo = new Proxy(userinfo,{
    get(target,prop){
        if(prop.startsWith('_')){
            throw new Error('不可访问')
        }else{
            return target[prop]
        }
    },
    set(target,prop,val){
        if(prop.startsWith('_')){
             throw new Error('不可访问')
        }else{
            target[prop] = val
            return true
        }
    },
    //拦截删除
    deleteProperty(target,prop){
       if(prop.startsWith('_')){
           throw new Error('不可删除')
       }else{
           delete target[prop]
           return true
       }
    },
    ownKeys(target){
        return Object.keys(target).filter(key=>!key.startsWith('_'))
    }
})

console.log(userinfo.age) //28
console.log(userinfo._password) //Uncaught Error: 不可访问
userinfo.age = 18
console.log(userinfo.age)//18

try{
    userinfo._password = 'xxx'
}catch(e){
    console.log(e.message) //不可访问
}

try{
    delete userinfo._password
}catch(e){
    console.log(e.message)//不可删除
}

for(let key in userinfo){
    console.log(key)//username age
}
```
### apply
拦截Proxy实例作为函数调用的操作，比如proxy(...args),proxy.call(object,...args),proxy.apply(...)
```js
let sum = (...args)=>{
    let num = 0;
    args.forEach(item=>{
        num += item
    })
    return num
}
sum = new Proxy(sum,{
    apply(target,ctx,args){
        console.log(target)
        console.log(ctx)
        console.log(args)
        return target(...args) * 2
    }
})

console.log(sum(1,2)) //6
console.log(sum.call(null, 1, 2, 3)) //12
console.log(sum.apply(null, [1, 2, 3]))//12
```
### construct
拦截Proxy实例作为构造函数调用的操作，比如new Proxy(...args)
```js
class User{
    constructor(name){
        this.name = name
    }
}
User = new Proxy(User,{
    construct(target,args,newTarget){
        console.log('construct')
        return new target(...args)
    }
})
console.log(new User('niu'))
```