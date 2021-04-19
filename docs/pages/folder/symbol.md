# Symbol
ES6引入了一种新的原始数据类型Symbol,表示独一无二的值。它是第七种数据类型，前六种是:undefined,null,boolean,string,number,object
Symbol值通过Symbol函数生成。也就是说，对象的属性名现在有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。
## 声明方式
```js
let s= Symbol()
typeof s //"symbol"
```
既然是独一无二的，那么两个Symbol()就一定是不相等的：
```js
let s1 = Symbol()
let s2 = Symbol()
console.log(s1===s2) //false
```
::: warning
Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说。由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型
:::
Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要为了便于区分。
```js
let s1 = Symbol('foo')
let s2 = Symbol('foo')
console.log(s1) //Symbol(foo)
console.log(s2) //Symbol(foo)
console.log(s1===s2) //false
```
## Symbol.for()
```Symbol.for()```接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建一个以该字符串为名称的Symbol，并将其注册到全局。
```js
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')
console.log(s1===s2) //true
```
::: warning
Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
:::
## Symbol.keyFor()
Symbol.keyFor()方法返回一个已登记的Symbol类型值的key
```js
const s1 = Symbol('foo')
console.log(Symbol.keyFor(s1)) //undefined

const s2 = Symbol.for('foo')
console.log(Symbol.keyFor(s2)) //foo
```
## 作为属性名
由于每一个Symbol值都是不想等的，这意味这Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
比如一个班级中，可能会有同学同名的情况，用Symbol，同名的学生信息就不会被覆盖：
```js
const stu1 = Symbol('李四')
const stu2 = Symbol('李四')
const grade = {
    [stu1]:{
        address:'a',
        age:8
    },
    [stu2]:{
        address:'b',
        age:9
    }
}
console.log(grade[stu1]) //{address: "a", age: 8}
console.log(grade[stu2]) //address: "b", age: 9}
```
## 属性遍历
```js
const sym = Symbol('chengzi')
class User{
    constructor(name){
        this.name = name
        this[sym] = 'chengzhu'
    }
    getName(){
        return this.name +this[sym]
    }
}
const user = new User('niuniu')
console.log(user.getName()) //niuniuchengzhu

for(let key in user){
    console.log(key) //name
}

for(let key of Object.keys(user)){
    console.log(key) //name
}

for(let key of Object.getOwnPropertySymbols(user)){
    console.log(key) //Symbol(chengzi)
}

for(let key of Reflect.ownKeys(user)){
    console.log(key) //name Symbol(chengzi)
}
```
## 消除魔术字符串
魔术字符串指的是，在代码之中多次出现，与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
```js
function getArea(shape){
    let area = 0;
    switch(shape){
        case 'Triangle':
            area = 1;
            break;
        case 'Circle':
            area = 2;
            break;
    }
    return area
}
console.log(getArea('Triangle'))
```
上面代码中，字符串Triangle，Circle就是魔术字符串。它多次出现，与代码形成“强耦合”，使用Symbol就可以很好的解决这个问题：
```js
const shapeType = {
    triangle:Symbol(),
    circle:Symbol()
}

function getArea(shape){
    let area = 0;
    switch(shape){
        case shapeType.triangle:
            area = 1;
            break;
        case shapeType.circle:
            area = 2;
            break;
    }
    return area
}
console.log(getArea(shapeType.triangle))
```