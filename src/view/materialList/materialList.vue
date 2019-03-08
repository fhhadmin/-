<template>
  <div>
    <Button @click="importMaterial">导入施工材料</Button>
    <Modal
      v-model="importExcel"
      title="施工材料导入"
      :closable = "false"
      @on-ok="importOk"
      @on-cancel="importCancel">
      <Button style="margin:20px" type="info" @click="importProject">导入现有项目</Button>
      <Button style="margin:20px" type="info" @click="importNewProject">导入新建项目</Button>
        <Upload
          action="//192.168.31.19:80/admin/proMaterial/importMaterial"
          :data="{
            pName:'file'
          }"
          :on-success="handleSuccess"
          >
        <Button icon="ios-cloud-upload-outline" style="margin:20px" type="info">上传材料表</Button>
    </Upload>
    </Modal>
    <Modal
      v-model="addPlan"
      title="添加材料计划"
      :closable = "false"
      @on-ok="addOk"
      @on-cancel="addCancel">
      <template v-for="(item,index) in list">
        <Tag checkable @on-change="isClick(item)" color="primary" :name="item" :checked="checked">{{item}}</Tag>
      </template>
      <div style="margin-top:100px">
        <template v-for="(item,index) in tagList">
          <Tag>{{item}}</Tag>
        </template>
      </div>
    </Modal>


    <editableTables :columns="columns" :value="dataList" :pageTotal="totalPages" @getPage="getPageNum" @on-select="selectRow">
      <Button @click="makePlan" type="primary">添加计划</Button>
      <Button type="info">导出</Button>
    </editableTables>
  </div>
</template>
<script>
import index from '@/config/index'
import { importMaterial } from '@/api/materialList/materialList'
import editableTables from '_c/editableTables/editableTables'
export default {
  data(){
    return {
      totalPages: 1,
      isEditable: true,
      importExcel: false,
      addPlan: false,
      file: "",
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
    editableTables
  },
  methods: {
    getPageNum(){

    },
    selectRow(){

    },
    importOk(){

    },
    importCancel(){

    },
    importMaterial(){
      this.importExcel = true
    },
    importProject(){

    },
    importNewProject(){

    },
    //上传成功
    handleSuccess(res, file, fileList){

    },
    addOk() {

    },
    addCancel(){

    },
    //添加计划
    makePlan(){
      this.addPlan = true
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
    }
  },
  watch: {

  },
  mounted(){
    let {baseUrl} = index
    this.file = baseUrl.pro
  }
}
</script>
<style>

</style>
