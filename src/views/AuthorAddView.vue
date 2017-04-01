<template>
    <div class="wrap">
        <div class="content">
            <form v-on:submit.prevent="add"  class="form" action="://slim.lixuguang.com/" method="post">
                <h1 class="author-head">添加作者</h1>
                <div class="alert" v-bind:class="messageType"  v-if="message">{{message}}</div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="control-label">姓名：</label>
                            <input class="form-control" type="text" name="author" value="">
                        </div>
                        <div class="form-group _meta">
                            <label class="control-label">所处时代:</label>
                            <input class="form-control" type="text" name="_dynasty" value="">
                        </div>
                        <div class="form-group _meta">
                            <label class="control-label">别名：</label>
                            <input class="form-control" type="text" name="_alias" value="">
                        </div>
                        <div class="form-group _meta">
                            <label class="control-label">尊称：</label>
                            <input class="form-control" type="text" name="username" value="">
                        </div>
                        <div class="form-group _meta">
                            <label class="control-label">字号：</label>
                            <input class="form-control" type="text" name="username" value="">
                        </div>  
                    </div>
                    <div class="col-sm-4 col-sm-offset-2">
                        <div class="form-group">
                            <label class="control-label">图像：</label>
                            <input type="file" accept="image/*" name="avatar" v-on:change="uploadFile" value="">
                        </div>
                    </div>
                </div>                                 

                <div class="form-group">
                    <label class="control-label">简介：</label>
                    <textarea class="form-control form-control-text" name="desction" value=""></textarea>
                </div>
                
                <div class="form-group">
                    <input class="btn btn-primary" type="submit" name="submit" value="提交">
                </div>
            </form> 
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthorAdd",
    data: function(){
        return {
            message: null, //信息
            messageType: null,
            ajax: false
        }
    },
    beforeMount: function(){
        //未登陆去登陆
        if(!this.checkSession){
            this.route2Login();
        }
    },
    computed: {
        checkSession(){
            //检测用户登录状态
            return this.$store.state.isLogin;
        },
        action(){
            return this.$store.state.route.params.action
        }
    },
    watch: {
        checkSession(newVal){
            //监测登录状态
            if(!newVal){
                this.route2Login();
            }
        }
    },
    methods:{
        add: function(event){
            var form = event.target;
            var metas = [];
            var data = new FormData();

            if(this.ajax){return false;}

            data.append("file", form.avatar.files[0]);
            data.append("author", form.author.value);
            data.append("desction", form.desction.value);
            if(form.author.value == ""){
                this.message = "姓名不能为空";
                this.messageType = "alert-danger";
                $("body").scrollTop(0);
                return false;
            }
            if(form.desction.value == ""){
                this.message = "简介不能为空";
                this.messageType = "alert-danger";
                $("body").scrollTop(0);
                return false;
            }        
            jQuery("._meta").each(function(){
                metas.push({
                    "name" : $(this).find(".control-label").html().slice(0, -1),
                    "value": $(this).find(".form-control").val()
                });
            });
            data.append("metas",  JSON.stringify(metas));

            console.log(data);
            this.message = null;
            this.ajax = true;
            
            this.$store.dispatch("AUTHOR_ADD", data).then(response=>{
                var data = response.data;
                if(data.code == "1"){
                    this.message = "添加成功";
                    this.messageType= "alert-success";
                    form.reset();
                }else{
                    this.message = data.message;
                    this.messageType= "alert-danger";
                }
                $("body").scrollTop(0);
                this.ajax = false;
            });
        },
        route2Login: function(){
            //路由到登录页
            //this.$router.push("/login?referer=/person");
            this.$router.push("/login?referer=/person/author/" + this.action);
        } 
    }
}
</script>