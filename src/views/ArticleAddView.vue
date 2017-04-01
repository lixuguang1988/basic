<template>
    <div class="wrap">
        <div class="content">
            <form v-on:submit.prevent="add"  class="form" action="://slim.lixuguang.com/" method="post">
                <h1 class="author-head">添加文章</h1>
                <div class="alert" v-bind:class="messageType"  v-if="message">{{message}}</div>
                <div class="row">
                    <div class="col-sm-5">
                        <div class="form-group">
                            <label class="control-label">标题：</label>
                            <input class="form-control" type="text" name="title" :value="item.title" @blur="updateItem">
                        </div>                    
                        <div class="form-group">
                            <label class="control-label">文章类型:</label>
                            <select class="form-control" name="column" v-model="selected">
                                <option v-for="column in columns" :value="column.id">{{column.name}}</option>
                            </select>
                        </div>                      
                    </div>
                    <div class="col-sm-5 col-sm-offset-2">
                        <div class="form-group _meta">
                            <label class="control-label">朝代：</label>
                            <input class="form-control" type="text" name="dynasty" :value="item.dynasty"  @blur="updateItem">
                        </div>                  
                        <div class="form-group">
                            <label class="control-label">作者:</label>
                            <input class="form-control" type="text" name="authorId" :value="item.authorId"  @blur="updateItem">
                        </div>
                    </div>
                </div>                                 
                <div class="form-group">
                    <label class="control-label">简介：</label>
                    <textarea class="form-control form-control-text" name="description" :value="item.description"  @blur="updateItem"></textarea>
                </div>
                <div class="form-group">
                    <label class="control-label">正文：</label>
                    <textarea class="form-control form-control-text" name="content" :value="item.content"  @blur="updateItem"></textarea>
                </div>
                <div class="form-group">
                    <label class="control-label">译文：</label>
                    <textarea class="form-control form-control-text" name="translate" :value="item.translate"  @blur="updateItem"></textarea>
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
    name: "ArticleAdd",
    data: function(){
        return {
            message: null, //信息
            messageType: null,
            messageTimer: null, //信息消失的timer
            ajax: false,
            selected: null,
            item : this.$store.article ? this.$store.article : {}, //可能是编辑文章
            columns: [
                {
                    id: 1,
                    name: "诗"
                },
                {
                    id: 2,
                    name: "词"
                },
                {
                    id: 3,
                    name: "歌"
                },
                {
                    id: 4,
                    name: "赋"
                },
                {
                    id: 5,
                    name: "曲"
                }                                                               
            ]
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
    beforeMount: function(){
        //未登陆去登陆
        if(!this.checkSession){
            this.route2Login();
        }
        if(this.action !== "add"){
            this.$store.dispatch("FETCH_ITEM_DATA").then(response=>{
                // item = {...response.data.row};
                item = Object.assign({}, response.data.row);
            });
        }
    },
    watch: {
        //所属栏目变化更新item的column字段
        selected(newValue){
            this.item.column = newValue;
        },
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
            var userid = this.$store.state.user.id;
            var formdata = this.item;


            if(this.ajax){return false;}
            clearTimeout(this.messageTimer);

            if(!userid){
                return this.setMessage("登录异常");
            }
            
            if(form.title.value == ""){
                return this.setMessage("标题不能为空");
            }
            if(form.content.value == ""){
                return this.setMessage("正文不能为空");
            }        

            this.message = null;
            this.ajax = true;

            formdata.userid = userid; //添加编辑人员
            
            this.$store.dispatch("ARTICLE_ADD", formdata).then(response=>{
                var data = response.data,
                    column = this.item.column;
                this.ajax = false;
                if(data.code == "1"){
                    this.setMessage("添加成功", "alert-success");
                    //清空内容
                    this.item = {};
                    this.$nextTick(()=>{
                        this.item.column = column;
                    });
                    this.messageTimer = setTimeout(()=>{
                        this.message = null;
                    }, 3000);
                }else{
                    this.setMessage(data.message);
                }
            });
        },
        setMessage: function(message, messageType, top){
            this.message = message;
            this.messageType = messageType || "alert-danger";
            document.body.scrollTop = top || 0;
        },
        //input、textarea blur的时候更新item
        updateItem: function(event){
            var target = event.target;
            this.item[target.name] = target.value;
        },
        route2Login: function(){
            //路由到登录页
            //this.$router.push("/login?referer=/person");
            this.$router.push("/login?referer=/person/article/" + this.action);
        }        
    }
}
</script>