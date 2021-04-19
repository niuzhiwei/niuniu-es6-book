# 可选的Catch Binding
在ES10之前我们都是这样捕获异常的：
```js
try{
    //tryCode
}catch(err){
    //catchCode
}

```
在这里err是必须的参数,在ES10可以省略这个参数:
```js
try{
    console.log('test')
}catch{
    console.error('error')
}
```
#### 案例：验证参数是否为JSON格式
这个需求我们只需要返回true或false,并不关心catch的参数。
```js
const validJSON = json =>{
    try{
        JSON.parse(json)
        return true
    }catch{
        return false
    }
}
const json = '{"name":"niuniu", "course": "es"}'
console.log(validJSON(json))
```