<template>
  <div id="app">
    <div>
      <github-button style="margin-right: 10px" href="https://github.com/sudongyuer">Follow @sudongyuer</github-button>
      <github-button href="https://github.com/sudongyuer/mini-vue-router" data-color-scheme="no-preference: light; light: light_high_contrast; dark: light;" data-icon="octicon-star" aria-label="Star sudongyuer/mini-vue-router on GitHub">Star
      </github-button>
    </div>
    <span style="font-size: 30px">👇</span>
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <!-- 路由出口 -->
    <router-view/>
  </div>
</template>

<script>
import GithubButton from 'vue-github-button'

export default {
  components: {
    GithubButton
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
