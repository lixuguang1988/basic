// import Promise from 'promise-polyfill'; 
import Vue from "vue";
import Vuex from "vuex";
import {fetchListData, fetchItemData, fetchAuthorData, registerUser, loginUser, addAuthor, addArticle} from "../../api/api";

import Cookie from "js-cookie"; 


//在vue上安装vuex
Vue.use(Vuex);

var store  = new Vuex.Store({
    //保存全局状态树的state的
    state : {
        activeType: null,
        itemsPerPage: 20, //每页显示的数据
        total: 1, //总页数
        list: {},  
        article: null, //文章
        prev: null, //上一篇文章ID
        next: null, //下一篇文章的ID
        author: null, //作者
        authors: null, //同时代作者,


        isLogin: (function(){
            return Cookie.get("userSession") ? true : false;
        })(), //登录状态
        user: (function(){
            var userSession = Cookie.get("userSession") ;
            return userSession ? JSON.parse(userSession) : null;
        })(), //登录用户
    },



    mutations: {
        //设置
        SET_ACTIVE_TYPE: function(state, {type}){
            state.activeType = type;
        },
        SET_ACTIVE_ITEMS: function(state, {list}){
            state.list = list;
        },
        SET_ACTIVE_TOTAL: function(state, {pageNumber}){
            state.total = pageNumber;
        },

        SET_ARTICLE: function(state, {article}){
            state.article = article;
        },
        SET_ARTICLE_PREV: function(state, {prev}){
            state.prev = prev;
        },
        SET_ARTICLE_NEXT: function(state, {next}){
            state.next = next;
        },
        SET_AUTHOR: function(state, {author}){
            //debugger;
            state.author = author;
        },


        
        //设置user的方法
        SET_USER: function(state, {user}){
            Cookie.set("userSession", JSON.stringify(user));
            state.user = user;
        },
        SET_USER_LOGOUT: function(state){
            Cookie.remove("userSession");
            state.user = null;
        },
        SET_LOGIN_STATUS: function(state, login){
            state.isLogin = login
        }       
    },


    actions: {

        AUTHOR_ADD: function({commit, state}, form){

            return addAuthor(form).catch((error)=>{
                throw new Error(error.toString())
            });
        },

        ARTICLE_ADD: function({commit, state}, form){

            return addArticle(form).catch((error)=>{
                throw new Error(error.toString())
            });
        },


        FETCH_LIST_DATA: function({commit, state, getters}, {type}){
            var itemsPerPage= state.itemsPerPage;
            var page = state.route.params.page || 1;
            // var start = (page - 1) * itemsPerPage;
            // var end = page * itemsPerPage;

            commit("SET_ACTIVE_TYPE", {type});

            // debugger

            return fetchListData(type, page).then((response)=>{
                //  console.log("store then");
                // debugger;
                commit("SET_ACTIVE_ITEMS", {list: response.data.res.list});
                commit("SET_ACTIVE_TOTAL", {pageNumber: response.data.res.pageNumber});
                
                return response;
            }).catch((error)=>{
                throw new Error(error.toString())
            });
        },

        FETCH_ITEM_DATA: function({commit, state, getters}){
            //从路由总获取item/:id
            var itemId = state.route.params.id;

             //debugger;

            return fetchItemData(itemId).then(response=>{
                console.log("store FETCH_ITEM_DATA");
                //debugger;
                commit("SET_ARTICLE", {article: response.data.row})
                commit("SET_ARTICLE_PREV", {prev: response.data.prev})
                commit("SET_ARTICLE_NEXT", {next: response.data.next})

                return response;
            }).catch(error=>{
                console.log("获取文章出错");
                throw new Error(error.toString())
            });
        },

        FETCT_AUTHOR_DATA: function({commit, state, getters}){
            //从路由获取 author/:id
            var authorId = state.route.params.id; 

            return fetchAuthorData(authorId).then(response=>{
                //debugger;
                console.log("store FETCH_AUTHOR_DATA", response);
                commit("SET_AUTHOR", {author: response.data.row})
                return response;
            }).catch(error=>{
                console.log("获取作者出错");
                throw new Error(error.toString())
            });           
        },

        /**
         * 检查用户登录的session 
         * 废弃
         */
        CHECK_LOGIN_SESSION: function({commit, state, getters}){
            var userSession = Cookie.get("userSession");
            if(userSession){
                commit("SET_USER", {user : JSON.parse(userSession)});
                commit("SET_LOGIN_STATUS", true);
            }else{
                commit("SET_USER", {user : null});
                commit("SET_LOGIN_STATUS", false);               
            }
        },


        //用户注册
        FETCH_USER_REGISTER: function({commit, state, getters}, formData){

            return registerUser(formData).then(response=>{
                return response;    
            }).catch(error=>{
                console.log("registerUser error", error);
            });
        },

        //用户登录
        FETCH_USER_LOGIN: function({commit}, formData){
            return loginUser(formData).then(response=>{
                var data = response.data;
                if(data.code == 1){
                    commit("SET_USER", {user: data.res});
                    commit("SET_LOGIN_STATUS", true);
                }

                return response;
            }).catch(error=>{
                console.log("loginUser error", error);
            })
        },

        



    },

    getters: {
        activeItems: function(state){
            return  state.list;
        },
        activeTotal: function(state){
            return state.total
        },
        article: function(state){
            return state.article;
        }
    }
})

export default store;
