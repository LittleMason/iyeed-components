<!--Main-->
<template>
  <div
          class="table-content"
          :class="className" v-if="data">
    <!-- 显示表格 -->
    <el-table
            ref="table"
            v-if="isrender"
            v-loading="listInfo.loading"
            :data="data"
            border
            :height="tableHeight || fixedHeight"
            style="width:100%"
            :row-class-name="tableRowClassName"
            highlight-current-row
            :cell-style="cellClassName"
            @row-click="rowclick"
            @select-all="handleSelectionChange"
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange">
      <el-table-column
              v-for="(item, index) in fieldList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align || 'left'"
              :sortable="item.sortable"
              :width="item.width"
              :min-width="item.minWidth || '100px'"
              :formatter="item.formatter"
              :show-overflow-tooltip="overflow">
        <template v-slot="scope" v-if="item.type === 'slot'">
          <!-- solt 自定义列-->
          <template v-if="item.type === 'slot'">
            <slot
                    :name="'col-' + item.value"
                    :row="scope.row"
            />
          </template>
          <!-- 标签 -->
          <el-tag v-else-if="item.type === 'tag'">
            {{ scope.row[item.value] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
              v-if="handle !== null"
              :key="'handle'"
              :fixed="handle.fixed"
              :align="handle.align || 'left'"
              :label="handle.label"
              :width="handle.width"
      >
        <template v-slot="scope">
          <template v-for="(item, index) in handle.btList">
            <!-- 自定义操作类型 -->
            <slot
                    v-if="item.slot"
                    :name="'bt-' + item.event"
                    :data="{item, row: scope.row}"
            />
            <!-- 操作按钮 -->
            <el-button
                    v-if="item.show"
                    :key="index"
                    v-waves
                    size="mini"
                    :type="item.type"
                    :icon="item.icon"
                    :disabled="item.disabled"
                    :loading="item.loading"
                    @click="handleClick(item.event, scope.row)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Sortable from 'sortablejs'
  export default {
    name: "index",
    props: {
      replyShow:{
        type: Boolean,
        default: () => {
          return false
        }
      },
      viewShow:{
        type: Boolean,
        default: () => {
          return false
        }
      },
      refObj:{
        type: Object
      },
      overflow:{
        type: Boolean,
        default: () => {
          return true
        }
      },
      // 自定义类名
      className: {
        type: String
      },
      // 类型列表
      listTypeInfo: {
        type: Object
      },
      // 表格字段配置
      fieldList: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 操作栏配置
      handle: {
        type: Object,
        default: () => {
          return null
        }
      },
      handleList:{
        type: Object,
        default: () => {
          return null
        }
      },
      // 列表数据
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 监听高度
      height:{
        type: Number,
        default:500
      },
      contentHeight:{
        type: Number,
        default:550
      },
      fixedHeight:{
        type: Number,
        default:null
      },
      toggleRowSelections:{
        type : Array,
        default: () => {
          return null
        }
      },
      //
      rowClassName:{
        type : Function,
        default:() => {}
      },
      isSortable:{
        type: Boolean,
        default: () => {
          return false
        }
      },
      cellClassName: [String, Function]
    },
    data () {
      return {
        // 列表相关
        listInfo: {
          loading: false, // 加载动画
        },
        tableHeight:  0,
        sortable:null,
        isrender: true,
        colinit: false,
        clodata: []
      }
    },
    watch: {
      height(value) {
        if (value) {
          this.tableHeight = this.getTableHeight();
        }
      },
      contentHeight(value) {
        if (value) {
          this.tableHeight = this.getTableHeight();
        }
      },
      //toggleRowSelections
      data: {
        handler: function (val) {
          this.$emit('update:refObj', this.$refs.table)
          this.$nextTick(()=>{
            this.toggleRowData()
          })
        },
        deep: true // 深度监听
      },
    },
    mounted () {
      this.$emit('update:refObj', this.$refs.table)
      document.body.ondrop = function(event) {
        event.preventDefault()
        event.stopPropagation()
      }
      let unwatch = this.$watch('data',(val)=>{
        if(val){
          this.columnDrop()
          unwatch()
        }
      })
      this.$watch('isrender', (val) => {
        if (val) {
          this.$nextTick(() => {
            this.columnDrop()
          })
        }
      })
    },
    methods: {
      columnDrop() {
        if(!this.isSortable){
          return
        }
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
        Sortable.create(wrapperTr, {
          animation: 180,
          sort: true,
          delay: 0,
          onEnd: evt => {
            const oi = evt.oldIndex
            const ni = evt.newIndex
            this.isrender = false
            // __arr.splice(ni, 0, ...__arr.splice(oi, 1))
            //
            // this.$nextTick(() => {
            //   this.clodata = __arr
            //   this.isrender = true
            // })
            const self = this
            this.$emit('columnDrop', oi, ni, function () {
              self.isrender = true
            })
          }
        })
      },
      handleSortChange(val) {
        // this.$refs.multipleTable.clearSort()
        this.$emit('handleSortChange', val)
      },
      rowclick(){

      },
      tableRowClassName({row, rowIndex}) {
        this.$emit('tableRowClassName',{row, rowIndex})
        return this.rowClassName({row, rowIndex})
      },
      handleSizeChange (val) {
        const query = this.listInfo.query
        query.pageSize = val // 每页条数
        query.curPage = 1 // 每页条数切换，重置当前页
      },
      handleCurrentChange (val) {
        this.listInfo.query.curPage = val // 当前页
      },
      // 派发按钮点击事件
      handleClick (event, data) {
        this.$emit('handleClick', event, data)
      },
      // 选中数据
      handleSelectionChange (rows) {
        this.$emit('handleEvent', 'tableCheck', rows)
      },
      //
      toggleRowData(){
        this.$emit('update:refObj', this.$refs.table)
        if (!this.toggleRowSelections) return;
        this.data.forEach((items, indexs)=>{
          this.$refs.table.toggleRowSelection(this.data[indexs],true);
        })
      },
      //
      getTableHeight(){
        //
        const boxH = document.body.clientHeight
        const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
        const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
        const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
        const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
        const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
        return boxH - (navH + tagH + searchH + pagerH + bottomH);
      }
    }
  }
</script>
<style lang="scss" scoped>
.table-content{
  height: 100%;
}
</style>