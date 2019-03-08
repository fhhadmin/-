<template>
  <div>
    <Button type="info" :size="buttonSize" @click="incExcel">导入仓储表</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonSize: 'large'
    }
  },
  methods: {
    incExcel() {
      console.log('导入')
    }
  }
}
</script>

<style>

</style>
