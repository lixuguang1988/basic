<template>
    <div class="wrap">
       <template v-if="article" >
        <transition
        :name="transition" mode="out-in">
        <!--v-show="isInitialize" watch id 的时候为啥消失了-->
            <div class="article" :key="id">
                <div class="article-head">{{article.title}}</div>    
                <div class="article-info"><router-link :to="'/author/'  + article.authorId ">{{article.author}}</router-link></div>    
                <div class="article-content" v-bind:class="type" v-html = "content"></div>
                <div class="article-translate">
                    <h2>译文:</h2>
                    <div v-html="translate"></div>
                </div>
                <div class="article-expert-review">
                    <h2>名家点评:</h2>
                    <div class="article-review-item" v-for="review in article.review">
                        {{review.dynasty}}.{{review.author}} &lt;{{review.source}}&gt;{{review.content}}
                    </div>
                </div>
            </div>
        </transition>  
        <div class="article-links">
            <router-link v-bind:class="article-link-prev" v-if="prev" :to="'/item/'+ prev">上一篇</router-link> 
            <router-link v-bind:class="article-link-next"   v-if="next" :to="'/item/'+ next">下一篇</router-link> 
        </div>
        </template>
        <template v-else>
            <div class="action-success text-center danger">出错了...</div>
        </template>
    </div> 
</template>    


<script>
export default {
    name: "itemView",
    data(){
      return {
          isInitialize: false,
          transition: null
      }  
    },
    computed:{
        article(){
            //debugger;
            return  this.isInitialize ? this.$store.state.article : {};
        },
        next(){
            return this.$store.state.next;
        },
        prev(){
            return this.$store.state.prev;
        },        
        content(){
            return this.isInitialize?  this.article.content.replace(/\n\r/g, "<br />") : null;
        },
        translate(){
            return this.isInitialize ? this.article.translate.replace(/\n\r/g, "<br />"): null;
        },
        type(){
            // debugger;
            if(this.$store.state.article){
               return {
                   [`article-content-${this.$store.state.article.alias}`] : true
               } 
            }
            return null;
        },
        id(){
            return this.$store.state.route.params.id;
        }
    },
    beforeMount(){
        // debugger;
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

            //为什么这里的response的undefined
            this.$store.dispatch("FETCH_ITEM_DATA").then((response)=>{
                    //debugger;
                    //console.log("ItemView FETCH_ITEM_DATA", response)
                    this.isInitialize = true;
                    if(!!to && !!from){
                        this.transition =  from > to ? 'slide-left' : 'slide-right'
                    }
                    return  response
            });
        }    
    }
    
}
</script>