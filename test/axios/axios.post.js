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