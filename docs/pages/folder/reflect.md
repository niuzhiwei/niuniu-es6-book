# Reflect
Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新API
## 设计目的
* 将Object属于语言内部的方法放到Reflect上
```js
let obj = {}
let newVal = ''
Reflect.defineProperty(obj,'name',{
    get(){
        return newVal
    },
    set(val){
        console.log('set')
        newVal = val
    }
})
obj.name = 'niu'
console.log(obj.name)//niu
```
* 修改某些Object方法的返回结果，让其变得更合理
```js
//老写法
try{
    Object.defineProperty(target,property,attributes)
}catch(e){
    //failure
}

//新写法
if(Reflect.defineProperty(target,property,attributes)){
    //success
}else{
    //failure
}
```
* 让Object操作变成函数行为
```js
//老写法
'assign' in Object //true
//新写法
Reflect.has(Object,'assign')//true
```
* Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
```js
Proxy(target,{
    set(target,name,value,receiver){
        var success = Reflect.set(target,name,value,receiver)
        if(success){
            console.log(`property ${name} on ${target} set to ${value}`)
        }
        return success
    }
})
```
Reflect是一个内置的对象，它提供拦截JS操作的方法。Reflect不是一个函数对象，因此它是不可构造的。
::: tip
与大多数全局对象不同，Reflect没有构造函数。不能与new运算符一起使用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）
:::

## 常用方法
### Reflect.apply()
语法```Reflect.apply(target,thisArgument,argumentsList)```
| 参数          | 含义                                                         | 必选 |
| ------------- | ------------------------------------------------------------ | ---- |
| target        | 目标函数                                                     | Y    |
| thisArgument  | target函数调用时绑定的this对象                               | N    |
| argumentsList | target函数调用时传入的实参列表，该参数应该是一个类数组的对象 | N    |
### 示例
```js
Reflect.apply(Math.floor,undefined,[2.989]) //2
Reflect.apply(''.charAt,'chengzi',[4])//g
```
### ES5对比
该方法与ES5中Function.prototype.apply()方法类似：调用一个方法并显式地指定this变量和参数列表（arguments)，参数列表可以是数组，或类数组的对象。
```js
Function.prototype.apply.call(Math.floor,undefined,[2.08])//2
```
### Reflect.construct()
Reflect.construct()方法的行为有点像new操作符构造函数，相当于运行new target(...args)

语法```Reflect.construct(target,argumentsList,newTarget)```
| 参数          | 含义                                                                            | 必选 |
| ------------- | ------------------------------------------------------------------------------- | ---- |
| target        | 被运行的目标函数                                                                | Y    |
| argumentsList | 调用构造函数的数组或者伪数组                                                    | Y    |
| newTarget     | 该参数为构造函数，参考new.target操作符，如果没有newTarget参数，默认和target一样 | N    |
::: danger
如果target或者newTarget不是构造函数，抛出TypeError
:::
Reflect.construct允许你使用可变的参数来调用构造函数
```js
var obj = new Foo(...args)
var obj = Reflect.construct(Foo,args)
```
#### 示例
```js
var d = Reflect.construct(Date,[1993,3,9])
d instanceof Date //true
d.getFullYear() //1993
```
如果使用newTarget参数，则表示继承了newTarget这个超类：
```js
function someConstructor(){}
var result = Reflect.construct(Array,[],someConstructor)

Reflect.getPrototypeOf(result) //someConstructor.prototype
Array.isArray(result)//true
```
### Reflect.defineProperty()
静态方法Reflect.defineProperty()基本等同于Object.defineProperty()方法，唯一不同的是返回Boolean值。
语法```Reflect.defineProperty(target,propertyKey,attributes)```
| 参数        | 含义                     | 必选 |
| ----------- | ------------------------ | ---- |
| target      | 目标对象                 | Y    |
| propertyKey | 要定义或修改的属性的名称 | Y    |
| attributes  | 要定义或修改的属性的描述 | Y    |
#### 示例
```js
const student = {}
Reflect.defineProperty(student,'name',{
    value:'zhuzhu'
}) //true
student.name //zhuzhu
```
### Reflect.deleteProperty()
Reflect.deleteProperty()允许你删除一个对象上的属性。返回一个Boolean值表示该属性是否被成功删除。
语法```Reflect.deleteProperty(target,propertyKey)```

| 参数        | 含义                 | 必选 |
| ----------- | -------------------- | ---- |
| target      | 删除属性的目标对象   | Y    |
| propertyKey | 将被删除的属性的名称 | Y    |

```js
var obj = {
    x:1,
    y:2
}
Reflect.deleteProperty(obj,'x') //true
obj //{y: 2}

var arr = [1,2,3]
Reflect.deleteProperty(arr,'2')//true
arr//1, 2, empty]

//如果属性不存在，返回true
Reflect.deleteProperty({},'gaga') //true

//如果属性不可配置，返回false
Reflect.deleteProperty(Object.freeze({
    foo:2
}),'foo')//false
```
### Reflect.get()
Reflect.get()方法的工作方式，就像从Object(target[propertyKey])中获取属性，但它是作为一个函数执行的。

语法```Reflect.get(target,propertyKey,receiver)```
| 参数        | 含义                                | 必选 |
| ----------- | ----------------------------------- | ---- |
| target      | 需要取值的目标对象                  | Y    |
| propertyKey | 需要获取的值的键值                  | Y    |
| receiver    | 如果遇到getter,此值将提供给目标调用 | N    |
#### 示例
```js
var obj = {
    x:1,
    y:2
}

Reflect.get(obj,'x') //1

Reflect.get(['one','two'],1) //two

var x = {
    p:2
}
var obj = new Proxy(x,{
    get(target,key,receiver){
        return key + 'guagua'
    }
})
Reflect.get(obj,'foo')//"fooguagua"
```
### Reflect.get​OwnProperty​Descriptor()
静态方法Reflect.get​OwnProperty​Descriptor()与Object.getOwnPropertyDescriptor()方法相似。如果在对象中存在，则返回给定的属性的属性描述符，否则返回undefined。

语法```Reflect.get​OwnProperty​Descriptor(target,propertyKey)```
| 参数        | 含义                             | 必选 |
| ----------- | -------------------------------- | ---- |
| target      | 需要寻找属性的目标对象           | Y    |
| propertyKey | 获取自己的属性描述符的属性的名称 | N    |
```js
Reflect.getOwnPropertyDescriptor({
    x:'hello'
},'x') //{value: "hello", writable: true, enumerable: true, configurable: true}

Reflect.getOwnPropertyDescriptor({
    x:'hello'
},'y') //undefined

Reflect.getOwnPropertyDescriptor([],'length') //{value: 0, writable: true, enumerable: false, configurable: false}
```
#### 对比
如果该方法的第一个参数不是一个对象(一个原始值)，那么将造成TypeError错误。而对于Object.getOwnPropertyDescriptor,非对象的第一个参数将被强制转换为一个对象处理

### Reflect.getPrototypeOf()
静态方法Reflect.getPrototypeOf()与Object.getPrototypeOf()方法是一样的。都是返回指定对象的原型

语法```Reflect.getPrototypeOf(target)```

### Reflect.has()
Reflect.has()用于检查一个对象是否拥有某个属性，相当于in 操作符。

语法```Reflect.has(target,propertyKey)```

### Reflect.isExtensible()
Reflect.isExtensible()判断一个对象是否可扩展（即是否能够添加新的属性），它与Object.isExtensible()方法一样。

语法```Reflect.isExtensible(target)```

### Reflect.ownKeys()
Reflect.ownKeys()方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。

语法```Reflect.ownKeys(target)```

```js
Reflect.ownKeys({
    z:3,
    y:2,
    x:1
})//["z", "y", "x"]

Reflect.ownKeys([])//["length"]

var sym = Symbol.for('1')
var sym2 = Symbol.for('2')
var obj = {
    [sym]:0,
    'str':0,
    [sym2]:0,
    '1':0
}
Reflect.ownKeys(obj) //["1", "str", Symbol(1), Symbol(2)]
```
### Reflect.preventExtensions()
Reflect.preventExtensions()方法阻止新属性添加到对象，例如：防止将来对对象的扩展被添加到对象中。该方法与 Object.preventExtensions() 方法一致

语法```Reflect.preventExtensions(target)```
```js
var empty = {}
Reflect.isExtensible(empty)//true
Reflect.preventExtensions(empty)//true
Reflect.isExtensible(empty)//false

Reflect.preventExtensions(1)
// TypeError: 1 is not an object

Object.preventExtensions(1)
// 1
```

### Reflect.set()
Reflect.set()方法允许你在对象上设置属性。他的作用是给属性赋值。

语法```Reflect.set(target,propertyKey,value,receiver)```
| 参数        | 含义                             | 必选 |
| ----------- | -------------------------------- | ---- |
| target      | 获取原型的目标对象           | Y    |
| propertyKey | 设置的属性的名称 | Y    |
| value | 设置的值 | Y   |
| receiver | 如果遇到setter,this将提供给目标调用 | N    |

```js
//Object
var obj = {}
Reflect.set(obj,'prop','value')//true
obj.prop//value

//Array
var arr=['duck','duck','duck']
Reflect.set(arr,2,'cow')//true
arr[2] //cow

Reflect.set(arr,'length',1)//true
arr//["duck"]
```

### Reflect.setPrototypeOf()
Reflect.setPrototypeOf()方法改变指定对象的原型

语法```Reflect.setPrototypeOf(target,prototype)```

```js
Reflect.setPrototypeOf({},Object.prototype) //true
Reflect.setPrototypeOf({},null) //true

```