<template>
  <div class="home">
    <router-link to="/a" tag="span">切a</router-link>
    <router-link to="/b" tag="span">切b</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
