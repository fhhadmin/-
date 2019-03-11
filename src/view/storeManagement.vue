<template>
  <div>
    <Upload
      action=""
      :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline" type="primary">导入仓库表</Button>
    </Upload>
    <div>
      <editable-tables :columns="columns" v-model="dataList" :selectShow="selectShow" :pageTotal='pageTotal' @getPage='getPageNum' :isLoading="loading"></editable-tables>
    </div>
  </div>
</template>

<script>
import editableTables from '_c/editableTables'
import index from '@/config/index.js'
export default {
  components: {
    editableTables,
  },
  data() {
    return {
      file: '',
      loading: false,
      buttonSize: 'large',
      selectShow: false,
      currentPage: 1,
      pageTotal:10,
      dataList:[
        {
          name: '水泥',
          standard: '',
          unit: '吨',
          amount: 300
        }
      ],
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '材料名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '规格型号',
          key: 'standard',
          align: 'center'
        },
        {
          title: '单位',
          key: 'unit',
          align: 'center'
        },
        {
          title: '库存数量',
          key: 'amount',
          align: 'center'
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render:(h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {

                },
                on: {
                  click: () => {
                    console.log(params,'......')
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
    }
  },
  methods: {
    handleSuccess (res) {
      //
    },
    getList (data) {
      this.loading = true
      //接口
    },
    getPageNum (e) {
      // console.log(e)
      this.currentPage = e
      this.getList({"pageNum": this.currentPage, "pageSize": 10})
    }
  },
  mounted() {
    // console.log(index,'index....')
     let {baseUrl} = index
     this.file = baseUrl.pro
  }
}
</script>
<style>

</style>
