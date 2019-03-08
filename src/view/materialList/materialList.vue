<template>
  <div>
    <!-- <UploadSingle></UploadSingle> -->
    <Upload
      ref="upload"
      action="/api/book/excel/import"
      name="excel-file"
      :show-upload-list="true"
      :on-format-error="handleFormatError"
      :on-success="handleSuccess"
      :on-error="handleError"
      :format ="['xlsx','xls']">
      <Button type="info" icon="ios-cloud-upload-outline">导入</Button>
    </Upload>
    <!-- <template v-for="(item,index) in list">
      <Tag checkable @on-change="isClick(item)" color="primary" :name="item" :checked="checked">{{item}}</Tag>
    </template>
    <div style="margin-top:100px">
      <template v-for="(item,index) in tagList">
        <Tag>{{item}}</Tag>
      </template>
    </div> -->
    <editableTables :columns="columns" :value="dataList" :pageTotal="totalPages" @getPage="getPageNum" @on-select="selectRow">
      <Button type="success">导入</Button>
      <Button type="info">导出</Button>
    </editableTables>
  </div>
</template>
<script>
import UploadSingle from '_c/uploadSingle/UploadSingle'
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
          title: '单位',
          key: 'unit',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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

                  }
                }
              }, '添加计划'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {

                },
                on: {
                  click: () => {

                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      dataList: [
        {
          name: '水泥',
          precification: '20kg/袋',
          planNum: 0,
          number: 1000,
          unit: '吨'
        },
        {
          name: '钢筋',
          precification: '20/捆',
          planNum: 0,
          number: 10000,
          unit: '根'
        },
        {
          name: '水泥',
          precification: '20kg/袋',
          planNum: 0,
          number: 1000,
          unit: '吨'
        }
      ],
      list: ['钢筋','水泥','砖头','沙子','石头'],
      checked: false,
      marterials: [],
      tagList: []
    }
  },
  components: {
    UploadSingle,
    editableTables
  },
  methods: {
    getPageNum(){

    },
    selectRow(){

    },
    handleFormatError(file){
      this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      })
    },
    handleSuccess(res,file){
      if(res.errcode === 0){
        this.dialoLead = false
        this.$Message.success("数据导入成功！")
        this._getBookList()
        this.$refs.upload.clearFiles()
      }
    },
    handleError(error,file){
      this.$Message.error("数据导入失败！")
    },
    isClick(e){
      if (this.tagList.length === 0) {
        this.tagList.push(e)
      }else{
        if(this.tagList.indexOf(e) === -1) {
            this.tagList.push(e)
        }else{
          this.tagList.splice(this.tagList.indexOf(e), 1)
        }
      }
      console.log(this.tagList,'....')
    }
  },
  watch: {

  }
}
</script>
<style>

</style>
