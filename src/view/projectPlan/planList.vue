<template>
  <div>
    <editableTables :columns="columns" :value="dataList" :isLoading="loading" :selectShow="false" style="width:600px;">
      <Select v-model="proName" placeholder="选择项目" style="width:200px;">
        <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
      </Select>
      <Button @click="makePlan" type="info">添加计划</Button>
    </editableTables>
    <Modal
      v-model="addPlan"
      title="添加项目计划">
      <div style="margin:20px;">
        <span>项目名称: </span>
        <Select v-model="selectProject" placeholder="选择项目" style="width:200px;">
          <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
        </Select>
      </div>
      <div style="margin:20px;">
        <span>计划时间: </span><DatePicker type="daterange" split-panels v-model="planTime" placeholder="选择计划执行时间段" style="width: 200px;margin-right:20px;"></DatePicker>
      </div>
      <div style="margin:20px;">
        <span>进场时间: </span><DatePicker type="daterange" v-model="startTime" split-panels placeholder="选择进场时间" style="width: 200px;margin-right:20px;"></DatePicker>
      </div>
      <div style="margin:20px;">
        <span>编号: </span><Input v-model="planNum" placeholder="请输入计划编号" style="width:200px;" />
      </div>
    </Modal>
    <Modal
      v-model="addMaterial"
      title="添加材料计划"
      @on-ok="addOk"
      :mask-closable="false"
      :fullscreen="true"
      :scrollable="true"
      @on-cancel="addCancel">
      <div style="margin-left:200px;">
        <div style="border: 1px solid #e5e5e5;width:1100px;height: 400px;margin-top:20px;">
          <div style="margin-top: -10px;margin-left:20px;font-size:16px;">待选材料列表</div>
          <div style="margin:20px;">
            <template v-for="(item,index) in list">
              <Tag checkable @on-change="isClick(item.materName+item.materModel)" color="primary" :name="item.materName" :checked="checked">{{item.materName}}({{item.materModel}})</Tag>
            </template>
          </div>
        </div>
        <div style="border: 1px solid #e5e5e5;width:1100px;height: 200px;margin-top:20px;">
          <div style="margin-top: -10px;margin-left:20px;font-size:16px;">已选列表</div>
          <div style="margin:10px">
            <template v-for="(item,index) in tagList">
              <Tag color="red">{{item}}</Tag>
            </template>
          </div>
          <div style="float:right;margin-top:180px;"><Button type="info">生成用料表</Button></div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import editableTables from '_c/editableTables/editableTables'
import { getProjectList } from '@/api/materialList/materialList'
export default {
  components:{
    editableTables
  },
  data(){
    return{
      pageNum: 1,
      loading: false,
      addPlan: false,
      addMaterial: false,
      checked: false,
      selectProject: '',
      planTime: '',
      startTime: "",
      proName: '',
      planNum: '',
      projectList: [],
      list: [],
      tagList: [],
      columns: [
        {
          title:'计划名称',
          key: 'planName'
        },
        {
          title: '操作',
          key: 'action',
          render:(h,params) => {
            return ('div',[
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {

                },
                on:{
                  click:() => {

                  }
                }
              }, '添加材料'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {

                },
                on:{
                  click:() => {

                  }
                }
              }, '查看'),
            ])
          }
        }
      ],
      dataList: [],
    }
  },
  methods: {
    //添加计划
    makePlan(){
      this.addPlan = true
      this.tagList = []
    },
    addOk() {

    },
    addCancel(){

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
    },
    // 获取项目列表
    getProjectList() {
      this.projectList = []
      getProjectList(this.pageNum,'100').then(res => {
        if(res.status === 1) {
          this.projectList = res.info.data
        }else{
          console.log('操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mounted() {
    this.getProjectList()
  }
}
</script>

<style>

</style>
