<template>
  <div>
    <div style="height: 50px">
    </div>
      首页
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default({
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  },
  mounted () {
    this.$router.push({
      name: Cookies.get('token_zhihuiminggong')
    })
  }
})
</script>
<style>

</style>
