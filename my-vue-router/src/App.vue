<template>
  <div id="app">
    <nav>
    {{this.$route}}
      <router-link to="/" tag="span">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {

  },
}
</script>
