<template>
    <div class="wrap">
        <div v-show="loading">加载中...</div>
        <div class="common-navigator">
            <router-link v-if="page > 1" :to="'/'  + type + '/' + (page - 1)">上一页</router-link>
            <a v-else class="disabled">上一页</a>
            <span>{{page}} / {{maxPage}} </span>
            <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1) ">下一页</router-link>
            <a v-else class="disabled">下一页</a>
        </div>
        <transition :name="transition">
            <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
                <transition-group tag="ul" name="item">
                    <item v-for="item in displayedItems" :key="item.id" :item="item"></item>
                </transition-group>
            </div>
        </transition>
    </div>
</template>

<script>
    import Item from "./Item.vue";

    var isInitialRender = true;

    export default {
        //具名组件
        name: "item-list",
        //注册用到的子组件
        components: {
            Item: Item
        },
        //用到属性
        props: {
            type: String
        },
        data: function(){
            
            var data =  {
                transition: 'slide-up',
                displayedPage: isInitialRender ? Number(this.$store.state.route.params.page) || 1 : -1,
                displayedItems: isInitialRender ? this.$store.getters.activeItems : [],
                loading: false
            }
            isInitialRender = false;
            return data;
        },
        computed: {
            page: function(){
                return  Number(this.$store.state.route.params.page) || 1;
            },
            maxPage : function(){
                return Math.ceil(this.$store.getters.activeTotal) || 1;
            },
            hasMore: function(){
                return this.maxPage > this.page;
            }
            // displayedItems: function(){
            //     return this.$store.getters.activeItems;
            // }
        },
        beforeMount() {
            // if(this.$root._isMounted){
                this.loadItem(1)
            // }
        },
        watch: {
            page(to, from){
                this.loadItem(to, from);
            }
        },
        methods: {
            loadItem: function(to = this.page, from = -1){
                this.loading = true;
                this.$store.dispatch("FETCH_LIST_DATA", {
                    type: this.type
                }).then((response)=>{
                    // console.log(".vue then");
                    if(this.page < -1 || this.page > this.maxPage){
                        this.$router.replace(`/${this.type}/1`);
                        return response
                    }

                    this.transition = from === -1
                    ? null
                    : to > from ? 'slide-left' : 'slide-right'
                    this.loading = false;
                    this.displayedPage = to;
                    this.displayedItems = this.$store.getters.activeItems;
                    console.log(this.$store.getters.activeItems, this);

                    return response;
                });
            }
        }

    }

</script>