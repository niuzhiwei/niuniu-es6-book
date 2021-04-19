# Class
## 声明类
在ES6之前：
```js
let Animal = function(type){
    this.type = type
    this.walk = function(){
        console.log("i'm walking")
    }
}
let dog = new Animal('dog')
let monkey = new Animal('monkey')
```
在上面代码中，定义了一个Animal类，类中声明了一个属性type，一个方法walk，然后通过new Animal这个类生成实例，完成了类的定义和实例化
也可以这么写：
```js
let Animal = function(type){
    this.type = type
}
Animal.prototype.walk = function(){
    console.log("i am walkding")
}
let dog = new Animal('dog')
let monkey = new Animal('monkey')
```
在ES6中把类的声明专业化了：
```js
class Animal{
    constructor(type){
        this.type = type
    }
    walk(){
        console.log('i am walking')
    }
}
let dog = new Animal('dog')
let monkey = new Animal('monkey')
```
```js
console.log(typeof Animal) //function
```
可以看出，class的类型还是function,和ES5没啥区别，那么class中定义的方法在哪里呢？
```js
console.log(Animal.prototype)
// {constructor: ƒ, walk: ƒ}
//   constructor: class Animal
//   walk: ƒ walk()
//   __proto__:
//   constructor: ƒ Object()
//   hasOwnProperty: ƒ hasOwnProperty()
//   isPrototypeOf: ƒ isPrototypeOf()
//   propertyIsEnumerable: ƒ propertyIsEnumerable()
//   toLocaleString: ƒ toLocaleString()
//   toString: ƒ toString()
//   valueOf: ƒ valueOf()
//   __defineGetter__: ƒ __defineGetter__()
//   __defineSetter__: ƒ __defineSetter__()
//   __lookupGetter__: ƒ __lookupGetter__()
//   __lookupSetter__: ƒ __lookupSetter__()
//   get __proto__: ƒ __proto__()
//   set __proto__: ƒ __proto__()
```
可以看成在Animal.prototype对象上有两个方法，一个是构造函数constructor,一个是自定义方法walk。和ES5的第二种写法一样呀！
```js
console.log(dog.hasOwnProperty('type')) //true
```
这个也和ES5中使用funtion定义类的方式一样。所以得出结论：class方法是function方法的语法糖
## Setters & Getters
```js
class CostomHTMLElement{
    constructor(element){
        this.element = elemet
    }
    get html(){
        return this.element.innerHTML
    }
    set html(value){
        this.element.innerHTML = value
    }
}
```
利用set/get实现了对element.innerHTML的简单封装

## 静态方法
在ES5中利用function实现的类实现静态方法如下：
```js
let Animal = function(type){
    this.type = type
    this.walk = function(){
        console.log('I am walking')
    }
}
Animal.eat = function(){
    console.log('I am eating')
}
```
在ES6中使用static来标记是不是静态方法：
```js
class Animal{
    constructor(type){
        this.type = type
    }
    walk(){
        console.log('I am walking')
    }
    static eat(){
        console.log('I am eating')
    }
}
```
## 继承
ES5中实现继承：
```js
//定义父类
let Animal = function(type){
    this.type = type
}
//定义方法
Animal.prototype.walk = function(){
    console.log('I am walking')
}
//定义静态方法
Animal.eat = function(){
    console.log('I am eating')
}
//定义子类
let Dog = function(){
    //初始化父类
    Animal.call(this,'dog')
    this.run = function(){
        console.log('I can run')
    }
}
//继承
Dog.prototype = Animal.prototype
```
ES6实现继承：
```js
class Animal{
    constructor(type){
        this.type = type
    }
    walk(){
        console.log('I am walking')
    }
    static eat(){
        console.log('I am eating')
    }
}
class Dog extends Animal{
    constructor(){
        super('dog')
    }
    run(){
        console.log('I can run')
    }
}
```