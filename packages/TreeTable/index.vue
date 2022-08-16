<template>
<div class="tree-table" v-if="tableHeight">
  <el-table :data="formatData"
            :row-style="showRow"
            v-bind="$attrs" border :max-height="tableHeight">
    <el-table-column v-if="fieldList.length === 0" minWidth="150" header-align="center" align="center">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>

    <el-table-column v-else v-for="(column, index) in fieldList"
                     :key="column.prop" :label="column.label" :width="column.width" :prop="column.prop"
                     :min-width="column.minWidth"
                     show-overflow-tooltip
                     header-align="center" align="center">
      {{column.prop}}
      <template slot-scope="scope">

        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.row[column.prop] }}
      </template>
    </el-table-column>
    <el-table-column
      v-if="handle !== null"
      :key="'handle'"
      :fixed="handle.fixed"
      align="center"
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
            @click="handleClick(item.event, scope.row)">
            {{ item.label }}
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
  <slot></slot>
</div>
</template>

<script>
  import treeToArray from './eval'
  export default {
    name: "index",
    props: {
      data: {
        type: [Array, Object],
      },
      fieldList: {
        type: Array,
        default: () => {
          return []
        }
      },
      columns: {
        type: Array,
        default: () => []
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
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      },
      btnLabel:{
        type: Object,
        default: null
      },
      // 操作栏配置
      handle: {
        type: Object
      },
    },
    watch:{
      //
      height(value){
        // alert('123')
        const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
        const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
        const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
        const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
        const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
        if (value){
          // this.tableHeight = (window.innerHeight) - (navH + tagH + searchH + pagerH + bottomH) - 30;
        }
        // console.log(value)
      },
      contentHeight(value){
        // alert('456')
        const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
        const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
        const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
        const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
        const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
        if (value){
          this.tableHeight = (window.innerHeight) - (navH + tagH + searchH + pagerH + bottomH) - 30;
        }
        // console.log(value)
      },
    },
    data(){
      return{
        selections: [],
        tableHeight:  0,
      }
    },
    computed: {
      // 格式化数据源
      formatData() {
        let tmp
        if (!Array.isArray(this.data)) {
          tmp = [this.data]
        } else {
          tmp = this.data
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }
    },
    methods: {
      showRow: function(row) {
        const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
        row.row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      toggleExpanded: function(trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
      },
      iconShow(index, record) {
        return (index === 0 && record.childMenus && record.childMenus.length > 0)
      },
      // handleExport(index, row){
      //   this.$emit('handleExport', {index:index, row:row})
      // },
      // 派发按钮点击事件
      handleClick (event, data) {
        this.$emit('handleClick', event, data)
      },
    },
    mounted() {
      const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
      const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
      const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
      const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
      const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
      this.tableHeight = (window.innerHeight) - (navH + tagH + searchH + pagerH + bottomH) - 30;
    }
  }
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style scoped>
  .tree-table{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
    content: "";
  }
  .processContainer {
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    margin-left: -18px;
  }
</style>
<style lang="scss">
  .tree-table {
    .el-table {
      box-sizing: border-box !important;
      width: 99.9% !important;
    }
  }
</style>
