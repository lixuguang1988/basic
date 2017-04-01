<template>
    <div class="wrap">
    <!--// <transition :name="transition" mode="out-in">-->
        <div class="author" :key="id" v-show="isInitialize">
            <div class="panel">
                <div class="panel-body author-basic clearfix">
                    <div class="author-info pull-left">
                        <div class="author-head">{{author.author}}</div>
                        <!--为什么meta 没有被渲染出来-->
                        <metadata v-for="item  in metas" v-bind:item="item" tag="p"></metadata>
                    </div>
                    <div class="author-avatar pull-right"  v-if="author.avatar" >
                        <img :src="author.avatar" width="200" height="300">
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading"><h2 class="panel-title">简介:</h2></div>
                <div class="panel-body" v-html = "author.desction"></div>
            </div>
            <div class="panel panel-default" v-if="author.works">
                <div class="panel-heading"><h2 class="panel-title">代表作品:</h2></div>
                <ul class="panel-body author-review-item">
                    <li v-for="work in author.works"><router-link :to="'/item/' + work.id">· {{work.title}}</router-link></li>
                </ul>
            </div>
        </div>
    <!--// </transition>  -->
    </div> 
</template>    


<script>
import Metadata from "../components/Metadata.vue";

// console.log("meta", meta);

// //debugger;


export default {
    name: "itemView",
    data(){
      return {
          isInitialize: false
        //   transition: null
      }  
    },
    //注册用到的子组件
    components: {
        Metadata: Metadata
    },
    computed:{
        author(){
            //debugger;
            return this.$store.state.author ? this.$store.state.author : {};
        },
        content(){
            return this.$store.state.author ?  this.author.content : null;
        },
        id(){
            return this.$store.state.route.params.id;
        },
        metas(){
            return this.$store.state.author ? JSON.parse(this.$store.state.author.metas) : []
        }
    },
    beforeMount(){
        //debugger;
        this.loadItem();
    },
    watch: {
        id(to, from){
             //debugger;
            console.log(to, from);
            this.loadItem(to, from)
        }
    },
    methods:{
        loadItem(to, from){

            //debugger
            //为什么这里的response的undefined
            this.$store.dispatch("FETCT_AUTHOR_DATA").then((response)=>{
                    //debugger;
                    console.log(" FETCH_AUTHOR_DATA", response);
                    this.isInitialize = true;
                    return  response
            });
        }    
    }
    
}
</script>