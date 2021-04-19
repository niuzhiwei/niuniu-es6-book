# 可选链 Optional chaining
可让我们在查询具有多层级的对象时，不再需要进行冗余的各种前置校验
```js
const user = {
    address:{
        street:'xxx',
        getNum(){
            return '93'
        }
    }
}
```
在之前的语法中，想获取到深层属性或方法，不得不做的前置校验，否则很容易遇到```Uncaught TypeError: Cannot read property...```这种错误，这极有可能让整个应用挂掉。
```js
const num = user&&user.address&&user.address.getNum&&user.address.getNum()
console.log(num)
```
用了Optional Chaining，上面的代码会变成:
```js
const num = user?.address?.getNum?.()
console.log(num)
```