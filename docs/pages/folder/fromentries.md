# Object.fromEntries()

方法Object.fromEntries()把键值对列表转换为一个对象，这个方法是和Object.entries()相对的。
```js
Object.fromEntries([
    ['a',1],
    ['b',2]
])//{a: 1, b: 2}
```
#### 案例1：Object转换操作
```js
const obj = {
    name: 'imooc',
    course: 'es'
}
const entries = Object.entries(obj)
console.log(entries)// [Array(2), Array(2)]

const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)//{name: "imooc", course: "es"}
```
#### 案例2：Map转Object
```js
const map = new Map()
map.set('name','niuniu')
map.set('age',28)

console.log(map) //Map(2) {"name" => "niuniu", "age" => 28}

const obj = Object.fromEntries(map)
console.log(obj) //{name: "niuniu", age: 28}
```
#### 案例3：过滤
course表示所有的课程，想请求课程分数大于80的课程组成的对象：
```js
const course = {
    math:80,
    chinest:85,
    pm:90
}
const res = Object.entries(course).filter(([key,val])=>val>80)
console.log(Object.fromEntries(res)) //{chinest: 85, pm: 90}
```