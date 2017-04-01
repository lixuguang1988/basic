import Vue from 'vue'
import Router from 'vue-router'


//在vue上安装vue-router
Vue.use(Router);


import createListView from '../views/CreateListView';
import ItemView from '../views/ItemView.vue';
import AuthorView from '../views/AuthorView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import PersonView from '../views/PersonView.vue';
import AuthorAddView from '../views/AuthorAddView.vue';
import ArticleAddView from '../views/ArticleAddView.vue';


// debugger;
console.log(ArticleAddView)



var router = new Router({
    routes: [
        {path: "/shi/:page(\\d+)?", component: createListView('shi') },
        {path: "/ci/:page(\\d+)?", component: createListView('ci') },
        {path: "/ge/:page(\\d+)?", component: createListView('ge') },
        {path: "/fu/:page(\\d+)?", component: createListView('fu') },
        {path: "/qu/:page(\\d+)?", component: createListView('qu') },
        {path: "/item/:id(\\d+)?", component: ItemView },
        {path: "/author/:id(\\d+)?", component: AuthorView },
        {path: "/register", component: RegisterView },
        {path: "/login", component: LoginView },
        {path: "/person/author/:action", component: AuthorAddView },
        {path: "/person/article/:action", component: ArticleAddView },
        {path: "/person", component: PersonView },
        {path: "/", redirect: '/shi' },
    ],
    //进入新页面定位到最顶部
    scrollBehavior: () => ({ y: 0 }) 
});

export default router;