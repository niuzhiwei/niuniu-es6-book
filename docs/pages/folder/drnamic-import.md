# Dynamic Import
现代前端打包资源越来越大，打包成几M的JS资源已成常态，而往往前端应用初始化时根本不需要全量加载资源，为了首屏渲染速度更快，很多时候都需要按需加载，比如懒加载图片等。

#### 案例
```js
const btn = document.querySelector('#btn')
btn.addEventListener('click',()=>{
    import('/ajax').then(mod=>{
        mod.defalut('static/a.json',res=>{
            console.log(res)
        })
    })
})
```