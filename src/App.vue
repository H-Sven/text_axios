<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  created(){
    let that = this;
    this.$get('/api/user/getInfo',{a:1,b:2})
      .then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      });
  }
}
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
