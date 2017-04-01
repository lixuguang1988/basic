<template>
    <div class="wrap">
        <div class="content">
            <form class="form-mini" v-on:submit.prevent="registerUser" v-show="!register" action="://slim.lixuguang.com/" method="post">
                <h1 class="article-head">用户注册</h1>
                <div class="alert" v-bind:class="messageType"  v-if="message">{{message}}</div>
                <div class="form-group">
                    <label class="control-label">用户名：</label>
                    <input class="form-control" type="text" name="username" value="">
                </div>
                <div class="form-group">
                    <label class="control-label">密码：</label>
                    <input class="form-control" type="password" name="password" value="">
                </div>
                <div class="form-group">
                    <label class="control-label">邮件：</label>
                    <input class="form-control" type="text" name="email" value="">
                </div>
                <div class="form-group">
                    <label class="control-label">头像：</label>
                    <input  type="file" name="file" value="">
                </div>
                <div class="form-group">
                    <input class="btn btn-success" type="submit" name="submit" value="立即注册">
                </div>
            </form>
            <div class="action-success text-center" v-show="register">
                注册成功, 去 <router-link to="/login">登陆</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "register",
    data: function(){
        return {
            register: null,
            message: false,
            messageType: null,
            ajax: false
        }
    },
    computed: {
        
    },
    methods:{
        registerUser: function(event){
            var data = new FormData(event.target);
            if(this.ajax){return false;}

            this.ajax = true;
            this.message = false;
            this.$store.dispatch("FETCH_USER_REGISTER", data).then(response=>{
                 debugger;
                var data = response.data;
                this.ajax = false;
                if(data.code == 0){
                    return this.setMessage(data.message);
                }
                debugger;
                this.message = "注册成功";
                this.messageType = "alert-success";
                this.register = true;
            });
        },
        setMessage: function(message, messageType, top){
            this.message = message;
            this.messageType = messageType || "alert-danger";
            document.body.scrollTop = top || 0;
        }
    }
}
</script>