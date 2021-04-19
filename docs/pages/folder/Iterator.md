# Iterator

```处理集合中的每个项是很常见的操作。JS提供了很多迭代集合的方法，从简单的for循环到map()和filter()。迭代器和生成器将迭代的概念直接带入核心语言，并提供了一种机制来自定义for...of循环的行为。```

上面是MDN的描述，可以看下面的示例：
```js
let authors = {
    allAuthors: {
        fiction: [
            'Agatha Christie',
            'J. K. Rowling',
            'Dr. Seuss'
        ],
        scienceFiction: [
            'Neal Stephenson',
            'Arthur Clarke',
            'Isaac Asimov',
            'Robert Heinlein'
        ],
        fantasy: [
            'J. R. R. Tolkien',
            'J. K. Rowling',
            'Terry Pratchett'
        ]
    }
}
```
这个数据结构汇总了所有作者，每个作者按创作性质进行了分类。如果想获取所有作者的名单，可以尝试下面的操作:
```js
for(let author of authors){
    console.log(author)
} //Uncaught TypeError: authors is not iterable
```
```js
for(let key in authors){
    let r = []
    for(let k in authors[key]){
        r = r.concat(authors[key][k])
    }
    console.log(r)// ["Agatha Christie", "J. K. Rowling", "Dr. Seuss", "Neal Stephenson", "Arthur Clarke", "Isaac Asimov", "Robert Heinlein", "J. R. R. Tolkien", "J. K. Rowling", "Terry Pratchett"]
}
```
上面的做法可以获取所有的作者名单，实际上是手动实现的遍历加上数据合并，下面来看下如何给这种自定义的数据结构进行遍历。

## 基本语法
Iterator就是ES6中用来实现自定义遍历的接口：
```js
authors[Symbol.iterator] = function(){
    let allAuthors = this.allAuthors
    let keys = Reflect.ownKeys(allAuthors)
    let values = []
    return {
        next(){
            if(!values.length){
                if(keys.length){
                    values = allAuthors[keys[0]]
                    keys.shift()
                }
            }
            return {
                done:!values.length,
                value:values.shift()
            }
        }
    }
}
```
这个代码在数据结构上部署了Iterator接口，下面就可以用for...of来遍历代码了：
```js
for(let value of authors){
    console.log(value)
}
```
要理解Iterator，首先要理解几个概念：可迭代协议和迭代器协议。
1. #### 迭代器协议
|属性|值|必选|
|-|-|-|
|next|返回一个对象的无参函数，被返回对象拥有两个属性:done和value|Y|
这是两个概念:可迭代协议、迭代器协议。通俗的讲，迭代器协议要求符合以下条件：
* 首先，它是一个对象
* 其次这个对象包含一个无参函数next
* 最后，next返回一个对象，对象包含done和value属性。其中done表示遍历是否结束，value返回当前遍历的值。
2. #### 可迭代协议
可迭代协议允许JS对象去定义或定制它们的迭代行为，例如定义在一个for...of结构中什么值可以被循环(得到)。一些内置类型都是内置的可迭代类型并且有默认的迭代行为，比如Array或者Map，另一些类型则不是（比如Object)。

为了变成可迭代对象，一个对象必须实现iterator方法，意思是这个对象（或者它原型链prototype chain上的某个对象)必须有一个名字是Symbol.iterator的属性:

|属性|值|必选|
|-|-|-|
|[Symbol.iterator]|返回一个对象的无参函数，被返回对象符合迭代器协议|Y|

如果让一个对象是可遍历的，就要遵守可迭代协议，该协议要求对象要部署一个以Symbol.interator为key的键值对，而value就是一个无参函数，这个函数返回的对象要遵守迭代器协议。

## Generator
上一节了解Generator，发现它是天然满足可迭代协议的。上述的代码我们可以用Generator来实现:
```js
authors[Symbol.iterator] = function*(){
    let allAuthors = this.allAuthors
    let keys = Reflect.ownKeys(allAuthors)
    let values = []
    while(1){
        if(!values.length){
            if(keys.length){
                values = allAuthors[keys[0]]
                keys.shift()
                yield values.shift()
            }else{
                return false
            }
        }else{
            yield values.shift()
        }
    }
}
```
同一个场景，同一个数据结构，写法却不同，利用Generator就不再需要显示的写迭代协议了。