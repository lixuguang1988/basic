<template>
  <div id="app">
      <div class="header">
        <div class="header-inner clearfix">
            <ul class="header-nav pull-left">
                <li><router-link to="/shi">诗</router-link></li>
                <li><router-link to="/ci">词</router-link></li>
                <li><router-link to="/ge">歌</router-link></li>
                <li><router-link to="/fu">赋</router-link></li>
                <li><router-link to="/qu">曲</router-link></li>
            </ul>
            <div v-if="user" class="header-user pull-right">
              <router-link to="/person">{{user.username}}</router-link>|
              <a href="javascript:void(0);" v-on:click="logout">退出</a>
            </div>
            <div v-else class="header-user pull-right">
                <router-link to="/login">登录</router-link>|
                <router-link to="/register">注册</router-link>
            </div>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
  </div>

</template>

<script>


export default {
  name: 'app',
  data: function(){
    return {}
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    },
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    logout: function(){
      this.$store.commit("SET_LOGIN_STATUS", false);
      this.$store.commit("SET_USER_LOGOUT");
    }
  }
  
}
</script>




