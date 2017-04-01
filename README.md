# basic

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 怎么让axios里面then里面都有response的函数签名
``` javascript
    axios.get("/static/item.json", {
        params: {
            id: 101
        }
    }).then(response=>{
        console.log("method then 1", response);
        //返回response
        return response;
    }).then(response=>{
        console.log("method then 2", response);
        //返回response
        return response;
    }).then(response=>{
        console.log("method then 3", response);
        //返回response
        //return response;
    }).then(response=>{
        //上面没有返回response,这里的response就undefined
        console.log("method then 4", response);
        return response;
    })
```


``` bash
;E:\Program Files (x86)\Microsoft VS Code\bin

AppData\Roaming\npm\
```

# IE 浏览器 vuex 需要promise 支持(已解决)
``` bash
# 安装 promise-polyfill
npm install promise-polyfill

# 把 node_modules/promise-polyfill/promise.min.js 移到 polyfill/目录中

# 页面添加 IE条件性注释
<![if IE]> 
    <script src="/polyfill/promise.min.js"></script>
<![endif]> 
```