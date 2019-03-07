<template>
  <div>
    <editableTables :columns="columns" :value="dataList" :pageTotal="totalPages" @getPage="getPageNum"></editableTables>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables'
export default {
  data(){
    return {
      totalPages: 1,
      isEditable: true,
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '规格/型号',
          key: 'precification',
          align: 'center'
        },
        {
          title: '数量',
          key: 'number',
          align: 'center'
        },
        {

        },
        {
          title: '单位',
          key: 'unit',
          align: 'center'
        },
        {
          type: 'selection',
          align: 'center'
        }
      ],
      dataList: [
        {
          name: '水泥',
          precification: '20kg/袋',
          number: 1000,
          unit: '吨'
        },
        {
          name: '水泥',
          precification: '20kg/袋',
          number: 1000,
          unit: '吨'
        },
        {
          name: '水泥',
          precification: '20kg/袋',
          number: 1000,
          unit: '吨'
        }
      ]
    }
  },
  components: {
    editableTables
  },
  methods: {
    getPageNum(e){
      console.log(e)
    }
  }
}
</script>
<style>

</style>
