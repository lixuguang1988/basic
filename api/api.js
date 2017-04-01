import axios from 'axios';

var slimApi = 'http://slim.lixuguang.com/';

export function fetchListData(type, page){
    return axios.get(slimApi + type + "/" + page);
}


export function fetchItemData(id){
    return axios.post(slimApi + "article/" + id);    
}


export function fetchAuthorData(authorId){
    return axios.get(slimApi + "author/" + authorId);    
}

export function registerUser(formdata){
    return axios.post(slimApi + "register", formdata);
}

export function loginUser(formdata){
    return axios.post(slimApi + "login", formdata);
}

/**
 * 添加作者
 * @param {object} formdata 
 */
export function addAuthor(formdata){
    return axios.post(slimApi + "author/add", formdata);
}

export function addArticle(formdata){
    return axios.post(slimApi + "article/add", formdata);
}