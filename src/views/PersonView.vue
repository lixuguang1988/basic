<template>
    <div class="wrap">
        <div class="user-bar clearfix">
            <div class="user-bar-avatar pull-left">
                <img  class="img-circle" :src="user ? user.avatar : ''" alt="">
            </div>
            <div class="user-bar-main">
                <div class="user-bar-name">{{user.username}}</div>
                <ul class="user-bar-menu">
                    <li class="active"><router-link  to="/person/article/add">动态</router-link></li>
                    <li><router-link to="/person/article/add">添加文章</router-link></li>
                    <li><router-link to="/person/author/add">添加作者</router-link></li>
                </ul>
            </div>
        </div>
        <div class=""></div>
    </div>
</template>

<script>
export default {
    name: "register",
    data: function(){
        return {
            user: this.$store.state.user
        }
    },
    beforeMount: function(){
        // debugger;
        console.log(this.user);
        if(!this.checkSession){
            this.route2Login();
        }
    },
    computed: {
        checkSession(){
            //检测用户登录状态
            return this.$store.state.isLogin;
        }
    },
    watch: {
        checkSession: function(newVal){
            //监测登录状态
            if(!newVal){
                this.route2Login();
            }
        }
    },
    methods:{
        route2Login: function(){
            //路由到登录页
            this.$router.push("/login?referer=/person");
        }
    }
}
</script>