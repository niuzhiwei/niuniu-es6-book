# 幂运算符**
原生实现求幂运算:
```js
function pow(x,y){
    let res = 1
    for(let i=0;i<y;i++){
        res *= x
    }
    return res
}
pow(2,10) //1024
```
还可以使用```Math.pow()```来完成。
```js
console.log(Math.pow(2,10)) //1024
```
在ES7中可以写成:
```js
console.log(2 ** 10) //1024
```