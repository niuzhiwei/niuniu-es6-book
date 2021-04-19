# Array
ES6新增原生API，如for...of,from,of,fill,find,findIndex...
## ES5中遍历数组方式
* #### for循环
* #### forEach()没有返回值，只是针对每个元素调用func
```js
let arr = [1,2,3,4,5];
arr.forEach((item)=>{
   console.log(item)
})
```
forEach不支持break、continue
``` js
let arr = [1,2,3,4,5];
arr.forEach((i)=>{
    if(i===2){
        return
    }else{
        console.log(i) //1,3,4,5
    }
})
```
上述代码本意是从第一个元素开始遍历，遇到等于2的数组项结束变量，结果输出的是1，3，4，5
::: danger
forEach代码块中不能使用break,continue，会抛出异常
:::
* #### map()返回新数组，每个元素为调用func的结果
```js
let arr = [1,2,3]
let result = arr.map(i=>{
    i += 1
    return i
})
console.log(arr,result)//[1,2,3] [2,3,4]
```
* #### filter()返回符合func条件的元素数组
```js
let arr = [1,2,3,4,5]
let result = arr.filter(item=>{
    return item %2===0
})
console.log(arr,result)// [1,2,3,4,5] [2,4]
```
* #### some()返回boolean,判断是否有元素符合func条件
```js
let arr = [1,2,3,4,5]
let result = arr.some(item=>{
    return item %2 ===1
})
console.log(arr,result) //[1, 2, 3, 4, 5] true
```
* #### every返回boolean,判断每个元素都符合func条件
```js
let arr = [1,2,3,4,5]
let result = arr.every(item=>{
    return item %2 ===1
})
console.log(arr,result) //[1, 2, 3, 4, 5] false
```
* #### reduce()接收一个函数作为累加器
```js
let arr = [1,2,3,4,5]
let sum = arr.reduce((prev,cur)=>{
    return prev+cur
},0)
console.log(sum) //15
```
```js
let arr = [1,2,3,4,5]
let max = arr.reduce((prev,cur)=>{
    return Math.max(prev,cur)
},)
console.log(max) //5
```
```js
let arr = [1,2,2,4,5]
let res = arr.reduce((prev,cur)=>{
    prev.indexOf(cur)===-1 &&prev.push(cur)
    return prev
},[])
console.log(res) // [1, 2, 4, 5]
```
for...in可以遍历数组
```js
let arr = ['a','b','c']
for(let index in arr){
    console.log(arr[index]) //a b c
}
```
::: warning
确实for...in可以遍历数组，而且还支持continue,break等功能，但是如果arr有自定义属性，也会被遍历出来，这显然不合理。
这是因为for...in是为遍历对象创造的，不是为数组设计的
:::

## ES6中遍历数组方式for...of
```js
for(let val of [1,2,3]){
    console.log(val) // 1 2 3
}
```
```js
for(variable of iterable){

}
```
上述伪代码，of后面是iterable既不是for循环规定的array,也不是for...in规定的Object,而是iterable.
for...of遍历的是一切可遍历的元素（数组、对象、集合）等。
::: tip
for...of支持break、contine、return
:::
## Array.from()
在JS中，有些对象被理解成数组，但是却不能使用数组原生的API，比如函数的参数arguments,DOM中的NodeList等。因为它们都是伪数组。
想要对这些对象使用数组的API就要把它们转换为数组，传统的做法是：
```js
let args = Array.prototype.slice.call(arguments)
let imgs = Array.prototype.slice.call(document.querySelectorAll('img'))
```
上述代码原理是使用call将数组的api应用在新的对象上。在ES6中可以使用Array.from来解决这个问题：
```js
let args = Array.from(arguments)
let imgs = Array.from(document.querySelectorAll('img'))
```

:smiley::smiley: Array.from除了将伪数组转换为数组，还有其他的用法：

语法：```Array.from(arrayLike,mapFn,thisArg)```

|参数|含义|必选|
|--|--|--|
|arrayLike|想要转换成数组的伪数组|Y|
|mapFn|如果指定了该参数，新数组中每个元素会执行该回调函数|N|
|thisArg|可选，执行回调函数mapFn时this对象|N|

从上面描述看出，Array.from还具备map的功能，比如初始化一个长度为5的数组，每个数组元素默认为1，之前的做法是：
```js
let arr = Array(6).join(' ').split('').map(item=>1)
//[1, 1, 1, 1, 1]
```
使用Array.from会简洁很多:
```js
Array.from({length:5},()=>1) 
// [1, 1, 1, 1, 1]
```
## Array.of()
Array.of()方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或者类型。
Array.of(7)创建一个具有单个元素7的数组，而Array(7)创建一个长度为7的空数组（注意： :point_left:这是指一个有7个空位(empty)数组，而不是由7个undefined组成的数组）。
```js
Array.of(7)// [7]
Array.of(1,2,3)// [1, 2, 3]
Array(7) //[empty × 7]
Array(1, 2, 3)// [1, 2, 3]
```
## Array.prototype.fill()
fill()方法用一个固定的值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引:
```js
let arr = [1,2,3,4]
arr.fill(0,1,3) //[1, 0, 0, 4]
```
:stuck_out_tongue: 上面我们提到用Array.from初始化一个长度固定，元素为指定值的数组。也可以用fill()达到同样的效果的：
```js
Array(5).fill(1) //[1, 1, 1, 1, 1]
```
::: tip
fill如果不指定索引会对所有元素进行操作
:::
## Array.prototype.find()
find()方法返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined。
```js
let array = [5,12,111]
let found = array.find((item)=>{
    return item>10
})
console.log(found) //12
```
## Array.prototype.findIndex()
findIndex()方法返回数组中满足提供的测试函数中的第一个元素的索引。否则返回-1。
```js
let array = [5,12,111]
let found = array.findIndex((item)=>{
    return item>10
})
console.log(found) //1
```
## Array.prototype.copyWithin()
在当前数组内部，将指定位置的成员复制到其他位置(会覆盖原有成员)，然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

语法```arr.copyWithin(target,start=0,end=this.length)```

|参数|含义|必选|
|--|--|--|
|target|从该位置开始替换数据。如果为负数，表示倒数|Y|
|start|从该位置开始读取数据，默认为0。如果为负数，表示从末尾开始计算|N|
|end|到该位置前停止读取数据，默认等于数组长度。如果为负数，表示从末尾开始计算|N|

```js
let arr = [1,2,3,4,5]
console.log(arr.copyWithin(1,3)) //[1, 4, 5, 4, 5]
```