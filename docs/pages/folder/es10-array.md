# Array扩展
## Array.prototype.flat()
flat()方法会按照一个可指定的深度递归遍历数组，并将所有元素与便利到的子数组中的元素合并为一个新数组返回。

语法```const newArray = arr.flat(depth)```
|参数|含义|必选|
|-|-|-|
|depth|指定要提取嵌套数组的结构深度，默认值为1|N|

```js
const numbers = [1,2,[3,4,[5,6]]]
console.log(numbers.flat(2)) // [1, 2, 3, 4, 5, 6]
```
## Array.prototype.flatMap()
flatMap()方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能，一个是map，一个是flat（深度为1）。
#### 示例1
```js
const numbers = [1,2,3]
numbers.map(x=>[x*2])//[[2], [4], [6]]
numbers.flatMap(x=>[x*2]) //(3) [2, 4, 6]
```
#### 示例2
```js
let arr= ['今天不是很开心','','晚安']
arr.map(s=>s.split(''))// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap(s=>s.split(''))//(9) ["今", "天", "不", "是", "很", "开", "心", "晚", "安"]
```