<template>
    <transition name="fade" mode="out-in">
    <div class="wrap">
        <div class="content">
            <form class="form-mini" v-on:submit.prevent="login"  action="://slim.lixuguang.com/" method="post">
                <h1 class="author-head text-center">用户登录</h1>
                <div class="alert alert-danger"  v-if="message">{{message}}</div>
                <div class="form-group">
                    <label class="control-label">用户名：</label>
                    <input class="form-control" type="text" name="username" value="">
                </div>
                <div class="form-group">
                    <label class="control-label">密码：</label>
                    <input class="form-control" type="password" name="password" value="">
                </div>
                <div class="form-group">
                    <input class="btn btn-success" type="submit" name="submit" value="立即登录">
                    <input type="hidden" :value="referer" name="referer" />
                </div>
            </form>
            <!--<div class="register-success" v-show="loggedIn">
                登录成功
            </div>-->
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    name: "register",
    data: function(){
        return {
            message: null, //登录失败信息,
            ajax: false
        }
    },
    beforeMount: function(){
        //已登录状态

        if(this.$store.state.isLogin){
            this.$router.replace("/");
        }
    },
    computed: {
        loggedIn:function(){
            return this.$store.state.isLogin;
        },
        referer: function(){
            return this.$store.state.route.query.referer;
        }
    },
    methods:{
        login: function(event){
            var data = new FormData(event.target);
            if(this.ajax){return false;}

            this.ajax = true;
            this.message = null;
            this.$store.dispatch("FETCH_USER_LOGIN", data).then(response=>{
                var data = response.data;
                this.ajax = false;
                if(data.code == "1"){
                    this.message = null;
                    this.$router.replace(this.referer ? this.referer: "/person");
                }else{
                    this.message = data.message;
                }
                
            });
        }
    }
}
</script>