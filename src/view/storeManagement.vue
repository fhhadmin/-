<template>
  <div>
    <Row>
      <Col span="3">
        <Select style="width:200px" placeholder="请选择材料名称">
          <Option></Option>
        </Select>
      </Col>
      <Col span="3">
        <Upload
          action=""
          :on-success="handleSuccess">
            <Button icon="ios-cloud-upload-outline" type="primary">导入仓库表</Button>
        </Upload>
      </Col>
      <Col span="18"></Col>
    </Row>
    <div>
      <editable-tables :columns="columns" v-model="dataList" :selectShow="selectShow" :pageTotal='pageTotal' @getPage='getPageNum' :isLoading="loading">

      </editable-tables>
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
