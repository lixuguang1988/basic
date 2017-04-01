#  axios里面只有第一个then里面有 response,后面的then里没有response
``` js
import axios from "axios";

axios.get("/static/item.json", {
    params: {
        id: 101
    }
}).then(function(response){
    console.log("method then 1", response);
    //返回response 就可以传递下一个then
    return response;
}).then(function(response){
    console.log("method then 2", response);
    //返回response 就可以传递下一个then
    return response;
}).then(function(response){
    console.log("method then 3", response);
    //return response;
}).then(function(response){
    //上面一个then里面没有放回response，
    //此处的response为undefined
    console.log("method then 4", response);
    return response;
}).catch(function(error){
    console.log(error)
})

```


# axios post 请求404，换成 get可以
``` js
import axios from "axios";

axios.post("/static/item.json").then(function(response){
    console.log("method then 1", response);
    return response;
}).catch(function(error){
    console.log(error)
})

axios.request({
    url: "/static/item.json",
    method: "get",
    params: {
        id: 101
    }
}).then(function(response){
    console.log("method then 1", response);
    return response;
}).catch(function(error){
    console.log(error)
})

axios.request({
    url: "/static/item.json",
    method: "post",
    data: {
        id: 101
    }
}).then(function(response){
    console.log("method then 1", response);
    return response;
}).catch(function(error){
    console.log(error)
})
```