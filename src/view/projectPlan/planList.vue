<template>
  <div>
    <editableTables :columns="columns" :value="dataList" :isLoading="loading" :selectShow="false" style="width:800px;">
      <Select v-model="proName" placeholder="选择项目" style="width:200px;">
        <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
      </Select>
      <!-- <Button @click="makePlan" type="info">添加计划</Button> -->
    </editableTables>
    <!-- <Modal
      v-model="addPlan"
      title="添加项目计划"
      @on-ok="addPlanOk">
      <div style="margin:20px;">
        <span>项目名称: </span>
        <Select v-model="selectProject" placeholder="选择项目" style="width:200px;">
          <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
        </Select>
      </div>
      <div style="margin:20px;">
        <span>计划时间: </span><DatePicker type="date" v-model="planTime" placeholder="选择计划执行时间段" style="width: 200px;margin-right:20px;"></DatePicker>
      </div>
      <div style="margin:20px;">
        <span>进场时间: </span><DatePicker type="date" v-model="startTime" placeholder="选择进场时间" style="width: 200px;margin-right:20px;"></DatePicker>
      </div>
      <div style="margin:20px;">
        <span>编 号: </span><Input v-model="planNum" placeholder="请输入计划编号" style="width:200px;" />
      </div>
    </Modal> -->
    <Modal
      v-model="addMaterial"
      title="添加材料计划"
      :mask-closable="false"
      :fullscreen="true"
      :scrollable="true">
      <div style="margin-left:200px;">
        <div style="border: 1px solid #e5e5e5;width:90%;height: 400px;margin-top:20px;">
          <div style="margin-top: -10px;margin-left:20px;font-size:16px;">待选材料列表</div>
          <div style="margin:100px;" v-if="isLoad">
            <div style="margin-top:150px;margin-left:120px;"><Spin size="small"></Spin></div>
            <Spin style="margin-top:-15px;margin-left:300px;"></Spin>
            <Spin style="margin-top:-25px;margin-left:550px;" size="large"></Spin>
          </div>
          <div style="margin:20px;">
            <template v-for="(item,index) in list">
              <Tag checkable @on-change="isClick(item.materName+item.materModel+ ' ' +item.mid)" color="primary" :name="item.materName" :checked="checked">{{item.materName}}({{item.materModel}})</Tag>
            </template>
          </div>
        </div>
        <div style="border: 1px solid #e5e5e5;width: 90%;height: 200px;margin-top:20px;" v-if="isTable">
          <div style="margin-top: -10px;margin-left:20px;font-size:16px;">已选列表</div>
          <div style="margin:10px">
            <template v-for="(item,index) in tagList">
              <Tag color="red">{{item}}</Tag>
            </template>
          </div>
          <div style="float:right;margin-top:180px;"><Button type="info" @click="generateTable">生成用料表</Button></div>
        </div>
        <div style="margin-top:20px;" v-if="!isTable">
          <!-- <virtual-list :size="40" :remain="8"> -->
            <editableTables :columns="planMaterial" :value="planMaterialList" @input="getInput" :selectShow="false" :showPage="false" :isLoading="isLoading"></editableTables>
          <!-- </virtual-list> -->
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addOk">添加</Button>
        <Button type="warning" @click="addCancel">取消</Button>
      </div>
    </Modal>
    <Modal
      title="计划材料详情"
      v-model="materQuery"
      :mask-closable="false"
      :width="800">
      <virtual-list :size="40" :remain="8">
        <editableTables :columns="planMaterial" :value="materialQueryList" :selectShow="false" :showPage="false">
          <Button type="primary" style="margin-left:708px">导出</Button>
        </editableTables>
      </virtual-list>
    </Modal>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import editableTables from '_c/editableTables/editableTables'
import { getProjectList, getPageList } from '@/api/materialList/materialList'
import { addProPlan, getProPlan, materialQuery } from '@/api/projectPlan/planList'
export default {
  components:{
    editableTables,
    virtualList
  },
  data(){
    return{
      pageNum: 1,
      loading: false,
      isLoading: false,
      materQuery: false,
      // addPlan: false,
      addMaterial: false,
      checked: false,
      isLoad: false,
      // selectProject: '',
      // planTime: '',
      // startTime: '',
      proName: '',
      planNum: '',
      pId: '',
      proId: '',
      planId: '',
      isTable: true,
      projectList: [],
      list: [],
      tagList: [],
      tagIdLIst: [],
      columns: [
        {
          title: '计划编号',
          key: 'number',
          align: 'center'
        },
        {
          title:'计划时间',
          key: 'planTime',
          align: 'center'
        },
        {
          title: '入场时间',
          key: 'inTime',
          align:'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render:(h,params) => {
            return ('div',[
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on:{
                  click:() => {
                    this.isLoad = true
                    this.addMaterial = true
                    this.tagList = []
                    this.tagIdLIst = []
                    this.isTable = true
                    this.getMaterialList()
                  }
                }
              }, '添加材料'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {

                },
                on:{
                  click:() => {
                    this.materQuery = true
                    this.planId = params.row.nid
                  }
                }
              }, '查看'),
            ])
          }
        }
      ],
      dataList: [],
      planMaterial: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '材料名称',
          key: 'materName',
          align: 'center'
        },
        {
          title: '材料规格',
          key: 'materModel',
          align: 'center'
        },
        {
          title: '单位',
          key: 'materUnit',
          align: 'center'
        },
        {
          title: "项目总量",
          key: 'materNum',
          align: 'center'
        },
        {
          title: '计划数量',
          key: 'planNum',
          editable: true,
          align: 'center'
        }
      ],
      planMaterialList: [],
      materialQueryList: []
    }
  },
  methods: {
    //添加计划
    // makePlan(){
    //   this.addPlan = true
    //   this.tagList = []
    // },
    addOk() {

    },
    addCancel(){
      this.addMaterial = false
    },
    isClick(e){
      var idList = []
      console.log(e.trim().split(' ')[0])
      if (this.tagList.length === 0) {
        this.tagList.push(e.trim().split(' ')[0])
        idList.push(e.trim().split(' ')[1])
      }else{
        if(this.tagList.indexOf(e.trim().split(' ')[0]) === -1) {
            this.tagList.push(e.trim().split(' ')[0])
            idList.push(e.trim().split(' ')[1])
        }else{
          this.tagList.splice(this.tagList.indexOf(e.trim().split(' ')[0]), 1)
         idList.splice(idList.indexOf(e.trim().split(' ')[1]), 1)
        }
      }
      this.tagIdLIst = idList
    },
    // 获取项目列表
    getProjectList() {
      this.projectList = []
      getProjectList( 1, '100').then(res => {
        if(res.status === 1) {
          this.projectList = res.info.data
          this.proName = this.projectList.length === 0 ? '' : this.projectList[0].pId
        }else{
          console.log('操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加项目计划
    // addPlanOk() {
    //   this.planTime = this.planTime.Format('yyyy-MM-dd')
    //   this.startTime = this.startTime.Format('yyyy-MM-dd')
    //   addProPlan(this.pId, this.planTime, this.startTime, this.planNum).then(res => {
    //     if(res.info === '操作成功'){
    //       this.$Message.success('计划添加成功!')
    //       this.getPageList()
    //     }else{
    //       this.$Message.error('添加失败!')
    //     }
    //   })
    // },
    // 查询项目计划列表
    getPageList(){
      this.loading = true
      getProPlan(this.proId, this.pageNum, 10).then(res => {
        this.loading = false
        this.dataList = []
        if(res.info === "暂无计划") {
          this.$Message.error('该项目暂无计划!')
        }else{
          this.dataList = res.info.data
          this.pageNum = res.info.pageTotal
        }
      })
      this.getMaterialList()
    },
    // 查询项目材料列表
    getMaterialList(){
      this.list = []
      getPageList(1,this.proId).then(res => {
        this.isLoad = false
        console.log(res,'res')
        if(res.info === '暂无数据'){
          this.$Message.error('暂无数据')
        }else{
          res.info.data.map(e => {
            this.list.push(e)
          })
        }
      })
    },
    // 生成用料表
    generateTable(){
      if(this.tagIdLIst.length !== 0) {
        materialQuery(this.tagIdLIst).then(res => {
          console.log(res)
          this.isTable = false
          this.planMaterialList = res.info
        })
      }else{
        this.$Message.error('请先选择计划材料!')
      }
    },
    // 保存编辑
    getInput(e){
      console.log(e)
      this.planMaterialList = e
    },
  },
  watch:{
    'selectProject'(e) {
      this.pId = e
    },
    'proName'(e) {
      this.proId = e
      this.getPageList()
    },
    'planNum'(e) {
      console.log(e,'eeee')
    }
  },
  mounted() {
    this.getProjectList()
    // this.getPageList()
  }
}
</script>

<style>

</style>
